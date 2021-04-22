import React from 'react'


export const ConfigurationStoreModal =
  ({
     submitAction,
     closeAction,
     resetAction,
   }: { submitAction: (e: any) => void, closeAction: () => void, resetAction: () => void }) => (
    <React.Fragment>
      <form onSubmit={submitAction}>
        <p>Description: </p><input name={'description'} type={'text'} />
        <button onClick={resetAction}>Reset</button>
        <button onClick={closeAction}>Close</button>
        <input type={'submit'} />
      </form>
    </React.Fragment>
  )