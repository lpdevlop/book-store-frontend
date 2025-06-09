import React, { useState } from 'react';
export interface ShippingData {
  email: string;
  firstName: string;
  lastName: string;
  company: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zip: string;
  phone: string;
  shippingMethod: string;
}
interface ShippingFormProps {
  onChange?: (data: ShippingData) => void;
}
const ShippingForm: React.FC<ShippingFormProps> = ({ onChange }) => {
  const [formData, setFormData] = useState<ShippingData>({

    
    email: '',
    firstName: '',
    lastName: '',
    company: '',
    address: '',
    country: 'Sri Lanka',
    state: '',
    city: '',
    zip: '',
    phone: '',
    shippingMethod: '',
  });

  const shippingOptions = [
    { id: 'reserve', label: 'Reserve - මුදල් ගෙවා වෙන්කර තබා ගන්න', price: 'රු. 0.00' },
    { id: 'courier', label: 'Courier Service - රට පුරා [2-7 working days]', price: 'රු. 350.00' },
    { id: 'gift', label: 'Gift - තෑගි පාර්සල් සේවය (Gift Wrap Included)', price: 'රු. 150.00' },
    { id: 'post', label: 'සාමාන්‍යය තැපැල් [2-7 working days]', price: 'රු. 250.00' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    const updated = { ...formData, [e.target.name]: e.target.value };
    setFormData(updated);
    onChange?.(updated);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-6">Shipping Address</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="email" name="email" placeholder="Email Address" onChange={handleChange} className="input" />
        <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} className="input" />
        <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} className="input" />
        <input type="text" name="company" placeholder="Company" onChange={handleChange} className="input" />
        <input type="text" name="address" placeholder="Street Address" onChange={handleChange} className="input" />
        <input type="text" name="city" placeholder="City" onChange={handleChange} className="input" />
        <input type="text" name="zip" placeholder="Zip/Postal Code" onChange={handleChange} className="input" />
        <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} className="input" />
        <select name="state" onChange={handleChange} className="input">
          <option value="">Select State/Province</option>
          <option value="western">Western</option>
          <option value="central">Central</option>
          <option value="southern">Southern</option>
          {/* Add more provinces as needed */}
        </select>
        <input type="text" name="country" value="Sri Lanka" readOnly className="input bg-gray-100" />
      </div>

      <h3 className="text-xl font-semibold mt-8 mb-4">Shipping Methods</h3>

      <div className="space-y-3">
        {shippingOptions.map(option => (
          <label key={option.id} className="flex items-center gap-3 border p-3 rounded cursor-pointer">
            <input
              type="radio"
              name="shippingMethod"
              value={option.id}
              onChange={handleChange}
              checked={formData.shippingMethod === option.id}
            />
            <div>
              <div className="font-medium">{option.label}</div>
              <div className="text-sm text-gray-600">{option.price}</div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ShippingForm;
