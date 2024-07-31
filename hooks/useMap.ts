import { Alert } from "react-native";
import { useEffect, useState } from "react";

const useMap = (fn: any) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<Boolean>(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fn();
      setData(res);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data, loading, refetch };
};

export default useMap;