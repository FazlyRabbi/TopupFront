import React from 'react'

export default function AddBalance() {
  return (
    <div className='add-balance'>
        <h3>Add Balance in your Account.. </h3>
        <form>
            <span>
                <label>Your Account Number</label>
                <input type="number" placeholder="type your Bkash No"  />
            </span>
            <span>
                <label>Enter your Amount</label>
                <input type="number" placeholder="Write Money Amount"  />
            </span>
            <span>
                <input type="submit" value="Deposit Balance" />
            </span>
        </form>
    </div>
  )
}
