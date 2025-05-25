import React, { useState } from 'react'

import { ITEMS as PRODUCTS } from '../../data/product-list-with-cart/data'

import { useDeviceType } from '../../hooks/useDeviceType'
import Modal from '../../components/shared/Modal'

type ProductId = (typeof PRODUCTS)[number]['id']

const ProductListWithCart: React.FC = () => {
  const device = useDeviceType()

  const [selectedProducts, setSelectedProducts] = useState<
    Array<{
      id: ProductId
      qty: number
    }>
  >([])
  const [open, setOpen] = useState(false)

  const handleProductSelectAndRemove = (id: ProductId, opType: 'add' | 'remove') => {
    if (opType === 'add') {
      setSelectedProducts((prev) => [{ id, qty: 1 }, ...prev])
    } else {
      setSelectedProducts((prev) => prev.filter((product) => product.id !== id))
    }
  }

  const handleQtyChange = (id: ProductId, opType: 'increment' | 'decrement') => {
    const currQty = selectedProducts.find((product) => product.id === id)?.qty

    if (currQty === undefined) return

    if (currQty === 1 && opType === 'decrement') {
      return handleProductSelectAndRemove(id, 'remove')
    }

    return setSelectedProducts((prev) => {
      return prev.map((product) =>
        product.id === id
          ? {
              ...product,
              qty: opType === 'increment' ? product.qty + 1 : product.qty - 1
            }
          : product
      )
    })
  }

  const totalQty = selectedProducts.reduce((acc, product) => acc + product.qty, 0)

  const cartProducts = selectedProducts.map((product) => {
    const productData = PRODUCTS.find((p) => p.id === product.id)

    if (!productData) {
      throw new Error(`Product with id ${product.id} not found`)
    }

    return {
      ...productData,
      qty: product.qty
    }
  })

  const totalPrice = cartProducts.reduce((acc, product) => acc + product.price * product.qty, 0)

  const startNewOrder = () => setSelectedProducts([])

  return (
    <React.Fragment>
      <main className="min-h-dvh h-full max-w-screen w-full py-12 px-4 xl:px-0 bg-[#f4edeb]">
        <section className="lg:max-w-screen-xl mx-auto grid grid-cols-1 max-w-sm gap-6 sm:max-w-2xl md:max-w-3xl xl:grid-cols-[1fr_340px]">
          <article>
            <h1 className="text-[#260f08] font-bold text-3xl mb-6">Desserts</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 gap-8">
              {PRODUCTS.map((product) => {
                const isProductSelected = selectedProducts.some((p) => p.id === product.id)

                return (
                  <div key={product.id} className="space-y-9">
                    <div className={`relative ${isProductSelected && 'border-3 border-[#c73a0f] rounded-lg'}`}>
                      <img
                        src={'/product-list-with-cart' + product.image[device].slice(1)}
                        alt={product.name}
                        className="w-full h-auto rounded-lg drop-shadow"
                      />
                      <div className="absolute max-w-full top-full -translate-y-1/2 left-1/2 -translate-x-1/2">
                        {isProductSelected ? (
                          <div className="flex font-semibold items-center justify-between gap-2 border rounded-full px-8 py-3 border-[#c73a0f] text-[#fcf9f7] bg-[#c73a0f] w-46 transition-all duration-300">
                            <button
                              onClick={() => handleQtyChange(product.id, 'decrement')}
                              className="border-2 border-[#fcf9f7] rounded-full p-1 aspect-square"
                            >
                              <img
                                src={'/product-list-with-cart/images/icon-decrement-quantity.svg'}
                                alt="decrease qty"
                              />
                            </button>
                            <span>{selectedProducts.find((item) => item.id === product.id)?.qty}</span>
                            <button
                              onClick={() => handleQtyChange(product.id, 'increment')}
                              className="border-2 border-[#fcf9f7] rounded-full p-1 aspect-square"
                            >
                              <img
                                src={'/product-list-with-cart/images/icon-increment-quantity.svg'}
                                alt="increase qty"
                              />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleProductSelectAndRemove(product.id, 'add')}
                            className="flex text-[#260f08] font-semibold items-center justify-center gap-2 bg-white border border-[#260f08] rounded-full px-8 py-3 hover:border-[#c73a0f] hover:text-[#c73a0f] w-46 transition-all duration-300"
                          >
                            <span>
                              <img src={'/product-list-with-cart/images/icon-add-to-cart.svg'} alt="add to cart icon" />
                            </span>
                            <span>Add to Cart</span>
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[#c9aea6] font-medium text-sm">{product.category}</p>
                      <h6 className="text-[#260f08] font-bold">{product.name}</h6>
                      <p className="text-[#c73a0f] font-medium">${product.price}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </article>
          <aside>
            <div className="bg-white p-6 rounded-lg max-w-lg mx-auto xl:mt-15">
              <h6 className="text-[#c73a0f] font-bold text-2xl">
                Your Cart (<span>{totalQty}</span>)
              </h6>

              {totalQty > 0 ? (
                <div className="mt-6 space-y-6">
                  <ul className="space-y-3">
                    {cartProducts.map((product) => {
                      return (
                        <li
                          key={product.id}
                          className="flex items-center justify-between border-b pb-3 border-[#c9aea6]"
                        >
                          <div className="space-y-2">
                            <p className="text-[#260f08 font-semibold">{product.name}</p>
                            <p className="flex items-center gap-4">
                              <span className="font-medium text-[#c73a0f]">{product.qty}x</span>
                              <span className="text-[#c9aea6]">@ ${product.price}</span>
                              <span className="font-medium text-[#87635a]">${product.price * product.qty}</span>
                            </p>
                          </div>
                          <button
                            onClick={() => handleProductSelectAndRemove(product.id, 'remove')}
                            className="border-2 border-[#c9aea6] rounded-full p-1 aspect-square hover:opacity-80 transition-all duration-300 "
                          >
                            <img src={'/product-list-with-cart/images/icon-remove-item.svg'} alt="remove item icon" />
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                  <div className="flex items-center justify-between">
                    <p className="text-[#260f08]">Order Total</p>
                    <p className="text-[#260f08 font-bold text-3xl">${totalPrice}</p>
                  </div>
                  <p className="bg-[#f4edeb] w-full p-4 rounded-lg flex items-center gap-4">
                    <img
                      src={'/product-list-with-cart/images/icon-carbon-neutral.svg'}
                      alt="carbon-neutral delivery"
                      className="w-6 h-6"
                    />
                    <span className="text-[#87635a] text-sm">
                      This is a <strong className="text-[#260f08]">carbon-neutral </strong>
                      delivery
                    </span>
                  </p>
                  <button
                    onClick={() => setOpen(true)}
                    className="font-semibold text-center border rounded-full px-8 py-3 border-[#c73a0f] text-[#fcf9f7] bg-[#c73a0f] hover:bg-[#260f08] hover:border-[#260f08] w-full transition-all duration-300"
                  >
                    Confirm Order
                  </button>
                </div>
              ) : (
                <div>
                  <img
                    src={'/product-list-with-cart/images/illustration-empty-cart.svg'}
                    alt="empty cart"
                    className="w-42 h-auto mx-auto mt-8 mb-4"
                  />
                  <p className="text-[#ad8985] text-sm font-semibold text-center">Your added items will appear here</p>
                </div>
              )}
            </div>
          </aside>
        </section>
      </main>
      <Modal onClose={() => setOpen(false)} open={open} closeOnBackdropClick>
        <img src={'/product-list-with-cart/images/icon-order-confirmed.svg'} alt="order confirmed" />
        <div className="my-5">
          <h6 className="text-[#260f08] font-bold text-3xl mb-1">Order Confirmed</h6>

          <p className="text-[#87635a]">We hope you enjoy your food!</p>
        </div>

        <div className="p-5 rounded-lg bg-[#f4edeb] my-5">
          <ul className="space-y-3 mb-4">
            {cartProducts.map((product) => {
              return (
                <li key={product.id} className="flex items-center justify-between border-b pb-3 border-[#c9aea6]/30">
                  <div className="space-y-2 flex items-center gap-4">
                    <div className="rounded-lg overflow-hidden w-16 h-16">
                      <img
                        src={'/product-list-with-cart' + product.image.thumbnail.slice(1)}
                        alt={product.name + ' thumbnail'}
                      />
                    </div>
                    <div>
                      <p className="text-[#260f08 font-semibold">{product.name}</p>
                      <p className="flex items-center gap-4">
                        <span className="font-medium text-[#c73a0f]">{product.qty}x</span>
                        <span className="text-[#ad8985]">@ ${product.price}</span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <span className="font-semibold text-[#260f08]">${product.price * product.qty}</span>
                  </div>
                </li>
              )
            })}
          </ul>
          <div className="flex items-center justify-between">
            <p className="text-[#260f08]">Order Total</p>
            <p className="text-[#260f08 font-bold text-3xl">${totalPrice}</p>
          </div>
        </div>
        <button
          onClick={() => {
            startNewOrder()
            setOpen(false)
          }}
          className="font-semibold text-center border rounded-full px-8 py-3 border-[#c73a0f] text-[#fcf9f7] bg-[#c73a0f] hover:bg-[#260f08] hover:border-[#260f08] w-full transition-all duration-300"
        >
          Start New Order
        </button>
      </Modal>
    </React.Fragment>
  )
}
export default ProductListWithCart
