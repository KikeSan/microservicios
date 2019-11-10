const catchAsyn = (ftn, level = true, params = []) => {
  return ftn(...params).catch(error => {
    console.log(error)
    process.exit(level ? 1 : 0)
  })
}

export { catchAsyn }
