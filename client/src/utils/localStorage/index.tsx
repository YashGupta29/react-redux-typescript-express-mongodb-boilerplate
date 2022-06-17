export const setObject = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const clearStorage = () => {
  localStorage.clear();
};

export const clearObject = (key: string) => {
  localStorage.removeItem(key);
};

// get value for a key
export const getObject = (key: string) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};
