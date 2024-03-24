import React from 'react'
import ReactLoading from "react-loading";

export const Loader = () => {
  return (
    <ReactLoading
    type={"bars"}
    color={"#ffffff"}
    height={120}
    width={120}
  />
  )
}
