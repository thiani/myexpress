// src/components/home/VehicleSearch.tsx
import React, { useState, useEffect } from 'react';
import { Search, CarFront } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Type definitions
interface VehicleModels {
  [key: string]: {
    models: string[];
    engineSizes: string[];
    trims: string[];
  };
}

interface SearchState {
  make: string;
  model: string;
  year: string;
  engineCC: string;
  trim: string;
}

const VehicleSearch: React.FC = () => {
  const navigate = useNavigate();
  const [searchState, setSearchState] = useState<SearchState>({
    make: '',
    model: '',
    year: '',
    engineCC: '',
    trim: ''
  });
  
  // Mock data with proper typing
  const makes: string[] = ['Toyota', 'Honda', 'Ford', 'BMW', 'Mercedes', 'Audi', 'Volkswagen'];
  
  const vehicleData: VehicleModels = {
    Toyota: {
      models: ['Camry', 'Corolla', 'RAV4', 'Highlander', 'Land Cruiser', 'Prado'],
      engineSizes: ['1500cc', '1800cc', '2000cc', '2400cc', '2800cc', '3000cc', '4000cc'],
      trims: ['GL', 'GLi', 'VX', 'VXR', 'GX']
    },
    Honda: {
      models: ['Civic', 'Accord', 'CR-V', 'Pilot', 'Fit', 'HR-V'],
      engineSizes: ['1300cc', '1500cc', '1800cc', '2000cc', '2400cc'],
      trims: ['DX', 'LX', 'EX', 'EX-L', 'Touring']
    },
    Ford: {
      models: ['F-150', 'Mustang', 'Explorer', 'Escape', 'Ranger'],
      engineSizes: ['1500cc', '2000cc', '2300cc', '3500cc', '5000cc'],
      trims: ['XL', 'XLT', 'Limited', 'Platinum', 'Sport']
    },
    BMW: {
      models: ['3 Series', '5 Series', 'X3', 'X5', '7 Series'],
      engineSizes: ['2000cc', '2500cc', '3000cc', '4000cc'],
      trims: ['Base', 'xDrive', 'M Sport', 'M', 'Individual']
    },
    Mercedes: {
      models: ['C-Class', 'E-Class', 'GLC', 'GLE', 'S-Class'],
      engineSizes: ['1800cc', '2000cc', '2500cc', '3000cc', '4000cc'],
      trims: ['Base', 'AMG Line', 'AMG', 'Exclusive', 'Avantgarde']
    },
    Audi: {
      models: ['A3', 'A4', 'Q5', 'Q7', 'A6'],
      engineSizes: ['1800cc', '2000cc', '2500cc', '3000cc'],
      trims: ['Base', 'Premium', 'Premium Plus', 'Prestige', 'S-Line']
    },
    Volkswagen: {
      models: ['Golf', 'Passat', 'Tiguan', 'Atlas', 'Jetta'],
      engineSizes: ['1400cc', '1800cc', '2000cc', '2500cc'],
      trims: ['S', 'SE', 'SEL', 'R-Line', 'Premium']
    }
  };

  const years: string[] = Array.from(
    { length: 25 }, 
    (_, i) => (new Date().getFullYear() - i).toString()
  );

  const handleSearch = () => {
    // Create search query string
    const params = new URLSearchParams();
    Object.entries(searchState).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    
    // Navigate to products page with search params
    navigate(`/products?${params.toString()}`);
  };

  // Get available models, engine sizes, and trims based on selected make
  const getAvailableOptions = () => {
    if (!searchState.make) return { models: [], engineSizes: [], trims: [] };
    return vehicleData[searchState.make] || { models: [], engineSizes: [], trims: [] };
  };

  const { models, engineSizes, trims } = getAvailableOptions();

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 -mt-8 relative z-10">
      <div className="flex items-center gap-2 mb-4">
        <CarFront className="h-6 w-6 text-brand-blue-500" />
        <h2 className="text-xl font-bold text-gray-900">Find parts for your vehicle</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Make */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Make</label>
          <select
            value={searchState.make}
            onChange={(e) => {
              setSearchState({
                make: e.target.value,
                model: '',
                year: searchState.year,
                engineCC: '',
                trim: ''
              });
            }}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 
              focus:ring-brand-blue-500/20 focus:border-brand-blue-500 bg-white"
          >
            <option value="">Select Make</option>
            {makes.map((make) => (
              <option key={make} value={make}>{make}</option>
            ))}
          </select>
        </div>
        
        {/* Model */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
          <select
            value={searchState.model}
            onChange={(e) => setSearchState({ ...searchState, model: e.target.value })}
            disabled={!searchState.make}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 
              focus:ring-brand-blue-500/20 focus:border-brand-blue-500 bg-white
              disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="">Select Model</option>
            {models.map((model) => (
              <option key={model} value={model}>{model}</option>
            ))}
          </select>
        </div>
        
        {/* Year */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
          <select
            value={searchState.year}
            onChange={(e) => setSearchState({ ...searchState, year: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 
              focus:ring-brand-blue-500/20 focus:border-brand-blue-500 bg-white"
          >
            <option value="">Select Year</option>
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        {/* Engine CC */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Engine Size</label>
          <select
            value={searchState.engineCC}
            onChange={(e) => setSearchState({ ...searchState, engineCC: e.target.value })}
            disabled={!searchState.make}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 
              focus:ring-brand-blue-500/20 focus:border-brand-blue-500 bg-white
              disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="">Select Engine Size</option>
            {engineSizes.map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>

        {/* Trim */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Trim</label>
          <select
            value={searchState.trim}
            onChange={(e) => setSearchState({ ...searchState, trim: e.target.value })}
            disabled={!searchState.make}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 
              focus:ring-brand-blue-500/20 focus:border-brand-blue-500 bg-white
              disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="">Select Trim</option>
            {trims.map((trim) => (
              <option key={trim} value={trim}>{trim}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Search Button */}
      <div className="mt-6">
        <button
          onClick={handleSearch}
          disabled={!searchState.make || !searchState.model}
          className="w-full bg-brand-blue-500 hover:bg-brand-blue-600 text-white 
            font-medium py-3 rounded-lg transition-colors flex items-center justify-center
            disabled:bg-gray-300 disabled:cursor-not-allowed gap-2"
        >
          <Search className="h-5 w-5" />
          Find Parts
        </button>
      </div>

      {/* Optional Helper Text */}
      <p className="text-sm text-gray-500 text-center mt-4">
        Select at least make and model to search for compatible parts
      </p>
    </div>
  );
};

export default VehicleSearch;