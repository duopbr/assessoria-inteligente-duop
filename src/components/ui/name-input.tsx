
import { User } from "lucide-react";
import { Input } from "./input";
import { Label } from "./label";

interface NameInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
}

export function NameInput({
  id,
  label,
  value,
  onChange,
  required = false,
  placeholder = "Digite seu nome"
}: NameInputProps) {
  return (
    <div className="text-left">
      <Label htmlFor={id} className="text-duop-gray-dark mb-1 block">
        {label}
      </Label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <User size={18} className="text-duop-gray" />
        </div>
        <Input
          id={id}
          type="text"
          placeholder={placeholder}
          className="pl-10"
          value={value}
          onChange={onChange}
          required={required}
        />
      </div>
    </div>
  );
}
