export type LibraryResponse = {
  version: string | null;
  title: string | null;
  link: string | null;
  pubDate: string | null;
  imageUrl: string | null;
  totalResults: number | null;
  startIndex: number | null;
  itemsPerPage: number | null;
  query: string | null;
  searchCategoryId: number | null;
  searchCategoryName: string | null;
  item: LibraryBookItemResponse[] | null;
};

export type LibraryBookItemResponse = {
  title: string | null;
  link: string | null;
  author: string | null;
  pubDate: string | null;
  description: string | null;
  creator: string | null;
  isbn: string | null;
  isbn13: string | null;
  itemId: number | null;
  priceSales: number | null;
  priceStandard: number | null;
  stockStatus: string | null;
  mileage: number | null;
  cover: string | null;
  categoryId: number | null;
  categoryName: string | null;
  publisher: string | null;
  customerReviewRank: number | null;
};

export type SearchBook = {
  id: number | null;
  title: string | null;
  author: string | null;
  publisher: string | null;
  cover: string | null;
  update_date: string | null;
};
