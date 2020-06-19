import React, { useState, useEffect, useContext } from "react"
import MediaQueryContext from "../../context/media-query-context"

const getContainerWidth = (mediaQueryMatch, phoneWidth, wide) => {
  switch (mediaQueryMatch) {
    case "--fullWidth":
      return wide ? 860 : 760
    case "--tabletWidth":
      return 560
    case "--phoneWidth":
      return phoneWidth - 40
  }
}

const ImagePlaceholder = ({ width, height, wide, children }) => {
  const { mediaQueryMatch, phoneWidth } = useContext(MediaQueryContext)
  const aspectRatio = height / width

  const getStyle = () => {
    const containerWidth = getContainerWidth(mediaQueryMatch, phoneWidth, wide)
    const finalWidth = Math.min(width, containerWidth)
    const paddingBottom = Math.round(
      aspectRatio * (finalWidth / containerWidth) * 100
    )

    return {
      width: `${finalWidth}px`,
      paddingBottom: `${paddingBottom}%`,
    }
  }

  const [style, setStyle] = useState(getStyle())

  useEffect(() => {
    setStyle(getStyle())
  }, [mediaQueryMatch, phoneWidth])

  return (
    <div className={wide ? "outer-img-container wide" : "outer-img-container"}>
      <div className="img-container" style={style}>
        {children}
      </div>
    </div>
  )
}

export default ImagePlaceholder
