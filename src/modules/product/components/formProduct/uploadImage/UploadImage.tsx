import { faCamera, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { IImage, IProductCreate } from '../../../../../models/product'
import './UploadImage.scss'
import { v4 as uuidv4 } from 'uuid'

interface Props {
  setImagesOrder(imagesOrder: string[]): void // LƯU TÊN ẢNH
  setImagesFile(imagesFile: File[]): void // LƯU FILE ẢNH
  productDetail: IProductCreate
  setDeletedImages(arrIDImageDeleted: number[]): void
}

const UploadImage = (props: Props) => {
  const { setImagesOrder, setImagesFile, productDetail, setDeletedImages } = props

  const [imgFiles, setImgFiles] = React.useState<any[]>([]) // LƯU FILE ẢNH
  const [imageNames, setImageNames] = React.useState<string[]>([]) // LƯU TÊN ẢNH
  const [imageUrls, setImageUrls] = React.useState<IImage[]>([]) // LƯU URL ẢNH
  const [imageDeleteds, setImageDeleteds] = React.useState<number[]>([])

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return
    }
    const selectedFilesArray = Array.from(e.target.files)
    const imgsFile = selectedFilesArray.map((file) => file)
    const imagesURL = selectedFilesArray.map((file) => ({ id: uuidv4(), file: URL.createObjectURL(file) }))
    const imageNames = selectedFilesArray.map((file) => file.name)
    setImgFiles((previousImgFiles) => previousImgFiles.concat(imgsFile))
    setImageNames((previousNames) => previousNames.concat(imageNames))
    setImageUrls((previousImageUrls) => previousImageUrls.concat(imagesURL))
  }

  const deleteHandler = (id: string | number) => {
    const index = imageUrls.findIndex((url) => url.id === id)
    if (index === -1) {
      return
    }
    setImgFiles(imgFiles.filter((file, i) => i !== index))
    setImageNames(imageNames.filter((name, i) => i !== index))
    setImageUrls(imageUrls.filter((url, i) => i !== index))
    if (!isNaN(+id)) {
      setImageDeleteds((previous) => previous.concat(+id))
    }
    if (isNaN(+id)) {
      URL.revokeObjectURL(imageUrls[index].file)
    }
  }

  // React.useEffect(() => {
  //   return () => {
  //     if (imageUrls && imageUrls.length > 0) {
  //       for (let i = 0; i < imageUrls.length; i++) {
  //         if (isNaN(+imageUrls[i].id)) {
  //           URL.revokeObjectURL(imageUrls[i].file)
  //         }
  //       }
  //     }
  //   }
  // }, [])

  React.useEffect(() => {
    setImagesOrder(imageNames)
  }, [imageNames])

  React.useEffect(() => {
    setImagesFile(imgFiles)
  }, [imgFiles])

  React.useEffect(() => {
    if (productDetail.id && productDetail.images) {
      setImageUrls(
        productDetail.images.map((img) => ({
          id: img?.id,
          file: img.thumbs && img.thumbs.length > 0 ? img.thumbs[1] : '',
          thumbs: img?.thumbs,
        })),
      )
      setImageNames(productDetail.images.map((img) => (img.file ? img.file : '')))
    }
  }, [productDetail])

  React.useEffect(() => {
    setDeletedImages(imageDeleteds)
  }, [imageDeleteds])

  return (
    <>
      {imageUrls && imageUrls.length > 0 && (
        <div className="list-image">
          {imageUrls.map((url, index) => (
            <div className="image-item" key={index}>
              <img src={url.file} className="image" />
              <FontAwesomeIcon icon={faCircleXmark} className="icon-delete" onClick={() => deleteHandler(url.id)} />
            </div>
          ))}
        </div>
      )}
      <div className="input-file">
        <input
          type="file"
          name="file"
          id="file"
          multiple
          accept="image/png , image/jpeg, image/webp"
          onChange={(e) => onSelectFile(e)}
        />
        <label htmlFor="file" className="input-label">
          <FontAwesomeIcon icon={faCamera} className="icon-upload" />
        </label>
      </div>
    </>
  )
}

export default UploadImage
