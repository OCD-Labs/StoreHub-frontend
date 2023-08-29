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
          {/* <div>
            <div>product information</div>
            <div>
              <p>Product name: Manny</p>
              <p>ProductId</p>
            </div>
          </div>
          <div className="w-full grid grid-cols-3 gap-4">
            <div className="border border-dotted-2">01</div>
            <div className="border border-dotted-2">02</div>
            <div className="border border-dotted-2">03</div>
            <div className="col-span-2 border border-dotted-2">04</div>
            <div className="border border-dotted-2">05</div>
            <div className="border border-dotted-2">06</div>
            <div className="col-span-2 border border-dotted-2">07</div>
          </div> */}

          <DialogHeader>
            <DialogTitle>Are you sure absolutely sure?</DialogTitle>
            <DialogDescription>Data here</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default SaleInfo
