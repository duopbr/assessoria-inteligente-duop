
import { Phone } from "lucide-react";
import { Input } from "./input";
import { Label } from "./label";

interface PhoneInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  maxLength?: number;
  placeholder?: string;
}

export function PhoneInput({
  id,
  label,
  value,
  onChange,
  error,
  required = false,
  maxLength = 16,
  placeholder = "(00) 00000-0000"
}: PhoneInputProps) {
  return (
    <div className="text-left">
      <Label htmlFor={id} className="text-duop-gray-dark mb-1 block">
        {label}
      </Label>
      <div className="flex items-center">
        <div className="bg-gray-50 border border-r-0 border-gray-300 px-3 py-2 rounded-l-md flex items-center gap-2">
          <Phone size={18} className="text-duop-gray" />
          <span className="text-duop-gray-dark font-medium">+55</span>
        </div>
        <Input
          id={id}
          type="tel"
          placeholder={placeholder}
          className="rounded-l-none"
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          required={required}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
