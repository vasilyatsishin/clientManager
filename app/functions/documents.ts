// 🔹 **Функції для отримання документів**
export const getDocumentsFromLocalDB = async (business:string) => {
  // Запит до SQLite (залежно від типу бізнесу)
  return business === "food"
    ? await fetchLocalFoodDocuments()
    : await fetchLocalNonFoodDocuments();
};

export const getDocumentsFromServer = async (business:string) => {
  const endpoint =
    business === "food"
      ? "https://jsonplaceholder.typicode.com/posts"
      : "https://jsonplaceholder.typicode.com/posts";
  const response = await fetch(endpoint);
  return response.json();
};

// 🔹 **Функції для локальної бази**
const fetchLocalFoodDocuments = async () => {
  // TODO: Реалізувати запит до SQLite для food
  return [2, 3];
};

const fetchLocalNonFoodDocuments = async () => {
  // TODO: Реалізувати запит до SQLite для nonfood
  return [];
};
