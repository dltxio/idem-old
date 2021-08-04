import React, { createContext, useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type ClaimContextType = {
  claims: server.Claim[];
  isLoading: boolean;
  fetchClaims: () => void;
};

export const ClaimContext = createContext<ClaimContextType>(null as any);

export const ClaimProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [claims, setClaims] = useState<server.Claim[]>([]);
  const [isLoading, setLoading] = useState(true);

  const fetchClaims = useCallback(async () => {
    const claimsLocal = await AsyncStorage.getItem("claims");
    if (claimsLocal) {
      setClaims(JSON.parse(claimsLocal));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchClaims();
  }, [fetchClaims]);

  return (
    <ClaimContext.Provider value={{ claims, isLoading, fetchClaims }}>
      {children}
    </ClaimContext.Provider>
  );
};
