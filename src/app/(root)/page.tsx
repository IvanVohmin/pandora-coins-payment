import { HomePage } from "@/modules/Home";
import { getProducts } from "@/shared/api/getProducts";
import { IProduct } from "@/shared/types/types";

export default async function Page() {

  const getProductsRequest = await getProducts()

  if (!getProductsRequest?.success) {
    return (
      <>
        <p>{getProductsRequest?.error}</p>
      </>
    )
  }

  // убрать товар с id = 1017542
  const products = getProductsRequest.products.filter((product: IProduct) => product.id !== 1017542)

  return (
    <HomePage products={products} />
  );
}
