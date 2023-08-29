import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../components/ui/Dialog'
import { ModalOptions, modalstore } from '@app/StoreManager/modalstore'

const SaleInfo = () => {
  const saleInfoStatus = modalstore((state) => state.isSaleInfoOpen)
  const setStateInfoStatus = modalstore((state) => state.setSaleInfoStatus)
  const saleInfo = modalstore((state) => state.saleInfo)

  return (
    <div>
      <Dialog open={saleInfoStatus} onOpenChange={setStateInfoStatus}>
        <DialogContent>
          <div className="border border-dotted rounded-md">
            <div className="bg-lightgray text-dark p-2">
              Product information
            </div>
            <div className="text-xs p-2">
              <p>
                Product name:{' '}
                <span className="text-dark">{saleInfo.item_name}</span>
              </p>
              <p>
                ProductId: <span className="text-dark">{saleInfo.item_id}</span>
              </p>
            </div>
          </div>
          <div className="border border-dotted rounded-md">
            <div className="bg-lightgray text-dark p-2">
              Pricing information
            </div>
            <div className="text-xs p-2">
              <p>
                Product price:{' '}
                <span className="text-dark">{saleInfo.item_price}</span>
              </p>
              <p className="border-b pb-2">
                Shipping fee: <span className="text-dark">300</span>
              </p>
              <p>
                Total: <span className="text-dark">{saleInfo.item_price}</span>
              </p>
            </div>
          </div>
          <div className="border border-dotted rounded-md">
            <div className="bg-lightgray text-dark p-2">Order details</div>
            <div className="text-xs p-2">
              <p>
                Order id: <span className="text-dark">{saleInfo.order_id}</span>
              </p>
              <p>
                Order date:{' '}
                <span className="text-dark">{saleInfo.order_date}</span>
              </p>
            </div>
          </div>
          <div className="border border-dotted rounded-md">
            <div className="bg-lightgray text-dark p-2">
              Delivery information
            </div>
            <div className="text-xs p-2">
              <p>
                Delivery date:{' '}
                <span className="text-dark">{saleInfo.delivery_date}</span>
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default SaleInfo
