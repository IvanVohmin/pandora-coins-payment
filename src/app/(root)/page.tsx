import { HomePage } from "@/modules/Home";
import { getProducts } from "@/shared/api/getProducts";
import { Suspense } from "react";
import { IProduct } from "@/shared/types/types";
import Spinner from "@/shared/utils/Spinner";

const MainPage = async () => {
  const getProductsRequest = await getProducts();

  if (!getProductsRequest?.success) {
    return (
      <p className="text-red-400 font-semibold">{getProductsRequest?.error}</p>
    );
  }

  // убрать товар с id = 1017542
  const products = getProductsRequest.products.filter(
    (product: IProduct) => product.id !== 1017542,
  );

  return (
    <Suspense
      fallback={
        <div className="h-[80vh] flex items-center justify-center">
          <Spinner />
        </div>
      }
    >
      <HomePage products={products} />
    </Suspense>
  );
};

export default MainPage;
