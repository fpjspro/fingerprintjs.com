import React from 'react'
import Img, { GatsbyImageFluidProps, GatsbyImageFixedProps, GatsbyImageProps } from 'gatsby-image'

export type ImageInfo = GatsbyImageProps & {
  childImageSharp?: GatsbyImageProps
  image?: string | { childImageSharp: GatsbyImageProps }
  extension?: string
  publicURL?: string
}

interface Props {
  className: string
  imageInfo?: ImageInfo | string
}

const PreviewCompatibleImage = ({ className, imageInfo }: Props) => {
  if (!imageInfo) {
    return <p>PreviewCompatibleImage can not be rendered (no imageInfo)</p>
  }

  const imageStyle = { borderRadius: '5px' }

  if (typeof imageInfo === 'string') {
    return <img className={className} style={imageStyle} src={imageInfo} alt='' />
  }

  const { alt = '', childImageSharp, image, extension, publicURL } = imageInfo

  if (!!image && typeof image != 'string' && isFluid(image.childImageSharp)) {
    return <Img className={className} style={imageStyle} fluid={image.childImageSharp.fluid} alt={alt} />
  }

  if (childImageSharp && isFluid(childImageSharp)) {
    return (
      <Img
        className={className}
        style={imageStyle}
        fluid={childImageSharp.fluid}
        alt={alt}
        imgStyle={{
          objectFit: 'contain',
        }}
      />
    )
  }

  if (childImageSharp && isFixed(childImageSharp)) {
    return <Img className={className} style={imageStyle} fixed={childImageSharp.fixed} alt={alt} />
  }

  if (!!image && typeof image === 'string')
    return <img className={className} style={imageStyle} src={image} alt={alt} />

  if (!childImageSharp && extension === 'svg') {
    return <img className={className} src={publicURL} alt={alt} />
  }

  return null
}

function isFluid(imageInfo: ImageInfo): imageInfo is GatsbyImageFluidProps {
  return (imageInfo as GatsbyImageFluidProps).fluid !== undefined
}

function isFixed(imageInfo: ImageInfo): imageInfo is GatsbyImageFixedProps {
  return (imageInfo as GatsbyImageFixedProps).fixed !== undefined
}

export default PreviewCompatibleImage
