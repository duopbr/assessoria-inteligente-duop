import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LogOut, Users, Calculator, CreditCard, Phone, AlertTriangle, Shield } from 'lucide-react';
import { toast } from 'sonner';
import type { Tables } from '@/integrations/supabase/types';

// Tipos baseados no schema do Supabase
type CalculadoraRow = Tables<'Calculadoras'>;
type AssessorRow = Tables<'assessores'>;
type CheckoutRow = Tables<'checkout_submissions'>;
type PixRow = Tables<'pix_phone_submissions'>;

export default function Admin() {
  const { user, loading, signOut } = useAuth();
  const [calculadorasData, setCalculadorasData] = useState<CalculadoraRow[]>([]);
  const [assessoresData, setAssessoresData] = useState<AssessorRow[]>([]);
  const [checkoutData, setCheckoutData] = useState<CheckoutRow[]>([]);
  const [pixData, setPixData] = useState<PixRow[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      loadAllData();
    }
  }, [user]);

  // Renderização condicional APÓS todos os hooks
  if (!user && !loading) {
    return <Navigate to="/auth" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const loadAllData = async () => {
    setIsLoadingData(true);
    setError('');

    try {
      const [calculadoras, assessores, checkout, pix] = await Promise.allSettled([
        supabase.from('Calculadoras').select('*').order('created_at', { ascending: false }),
        supabase.from('assessores').select('*').order('created_at', { ascending: false }),
        supabase.from('checkout_submissions').select('*').order('created_at', { ascending: false }),
        supabase.from('pix_phone_submissions').select('*').order('submitted_at', { ascending: false })
      ]);

      if (calculadoras.status === 'fulfilled' && !calculadoras.value.error) {
        setCalculadorasData(calculadoras.value.data || []);
      }
      if (assessores.status === 'fulfilled' && !assessores.value.error) {
        setAssessoresData(assessores.value.data || []);
      }
      if (checkout.status === 'fulfilled' && !checkout.value.error) {
        setCheckoutData(checkout.value.data || []);
      }
      if (pix.status === 'fulfilled' && !pix.value.error) {
        setPixData(pix.value.data || []);
      }
    } catch {
      setError('Erro ao carregar dados. Verifique as permissões de administrador.');
    }

    setIsLoadingData(false);
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success('Logout realizado com sucesso');
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('pt-BR');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">Sistema seguro de gerenciamento</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm">
              <p className="font-medium">{user?.email}</p>
              <p className="text-muted-foreground">Administrador</p>
            </div>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Alert className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Segurança Implementada:</strong> Todos os dados dos clientes estão agora protegidos. 
            As permissões de administrador precisam ser configuradas no banco de dados para acessar os dados.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Calculadoras</CardTitle>
              <Calculator className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{calculadorasData.length}</div>
              <p className="text-xs text-muted-foreground">Submissões de cálculo</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assessores</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{assessoresData.length}</div>
              <p className="text-xs text-muted-foreground">Leads de assessores</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Checkout</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{checkoutData.length}</div>
              <p className="text-xs text-muted-foreground">Submissões de checkout</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">PIX Phone</CardTitle>
              <Phone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pixData.length}</div>
              <p className="text-xs text-muted-foreground">Submissões PIX</p>
            </CardContent>
          </Card>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="calculadoras" className="space-y-4">
          <TabsList>
            <TabsTrigger value="calculadoras">Calculadoras ({calculadorasData.length})</TabsTrigger>
            <TabsTrigger value="assessores">Assessores ({assessoresData.length})</TabsTrigger>
            <TabsTrigger value="checkout">Checkout ({checkoutData.length})</TabsTrigger>
            <TabsTrigger value="pix">PIX ({pixData.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="calculadoras">
            <Card>
              <CardHeader>
                <CardTitle>Dados das Calculadoras</CardTitle>
                <CardDescription>Submissões das calculadoras financeiras</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingData ? (
                  <div className="flex items-center justify-center p-8">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                  </div>
                ) : calculadorasData.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Telefone</TableHead>
                          <TableHead>Patrimônio</TableHead>
                          <TableHead>Data</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {calculadorasData.slice(0, 10).map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.Name || 'N/A'}</TableCell>
                            <TableCell>{item.email || 'N/A'}</TableCell>
                            <TableCell>{item.phone || 'N/A'}</TableCell>
                            <TableCell>{item.patrimonio || 'N/A'}</TableCell>
                            <TableCell>{formatDate(item.created_at)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    Nenhum dado disponível ou permissões insuficientes
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assessores">
            <Card>
              <CardHeader>
                <CardTitle>Leads de Assessores</CardTitle>
                <CardDescription>Potenciais clientes interessados em assessoria</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingData ? (
                  <div className="flex items-center justify-center p-8">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                  </div>
                ) : assessoresData.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome</TableHead>
                          <TableHead>Celular</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Data</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {assessoresData.slice(0, 10).map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.nome}</TableCell>
                            <TableCell>{item.celular}</TableCell>
                            <TableCell>
                              <Badge variant={item.Venda === 'Sim' ? 'default' : 'secondary'}>
                                {item.Venda === 'Sim' ? 'Vendido' : 'Prospect'}
                              </Badge>
                            </TableCell>
                            <TableCell>{formatDate(item.created_at)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    Nenhum dado disponível ou permissões insuficientes
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="checkout">
            <Card>
              <CardHeader>
                <CardTitle>Submissões de Checkout</CardTitle>
                <CardDescription>Dados de checkout e pagamento</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingData ? (
                  <div className="flex items-center justify-center p-8">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                  </div>
                ) : checkoutData.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Plano</TableHead>
                          <TableHead>Preço</TableHead>
                          <TableHead>Data</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {checkoutData.slice(0, 10).map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>{item.plan_title}</TableCell>
                            <TableCell>{item.plan_price}</TableCell>
                            <TableCell>{formatDate(item.created_at)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    Nenhum dado disponível ou permissões insuficientes
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pix">
            <Card>
              <CardHeader>
                <CardTitle>Submissões PIX</CardTitle>
                <CardDescription>Dados de pagamento via PIX</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingData ? (
                  <div className="flex items-center justify-center p-8">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                  </div>
                ) : pixData.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Telefone</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Plano</TableHead>
                          <TableHead>Patrimônio</TableHead>
                          <TableHead>Data</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pixData.slice(0, 10).map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.phone_number || 'N/A'}</TableCell>
                            <TableCell>{item.Email || 'N/A'}</TableCell>
                            <TableCell>{item.plan_title || 'N/A'}</TableCell>
                            <TableCell>{item.Patrimonio || 'N/A'}</TableCell>
                            <TableCell>{formatDate(item.submitted_at)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    Nenhum dado disponível ou permissões insuficientes
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
