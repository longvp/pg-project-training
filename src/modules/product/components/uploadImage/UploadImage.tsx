import { faCamera, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { IImage } from '../../../../models/product'
import './UploadImage.scss'
import { v4 as uuidv4 } from 'uuid'

interface Props {
  setImagesOrder(imagesOrder: string[]): void // LƯU TÊN ẢNH
  setImagesFile(imagesFile: File[]): void // LƯU FILE ẢNH
}

const UploadImage = (props: Props) => {
  const { setImagesOrder, setImagesFile } = props

  const [imgFiles, setImgFiles] = React.useState<any[]>([]) // LƯU FILE ẢNH
  const [imageNames, setImageNames] = React.useState<any[]>([]) // LƯU TÊN ẢNH
  const [imageUrls, setImageUrls] = React.useState<any[]>([]) // LƯU URL ẢNH

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
    // setImageUrls(imageUrls.filter((url) => url.file !== urlImg))
    URL.revokeObjectURL(imageUrls[index])
  }

  React.useEffect(() => {
    return () => {
      if (imageUrls && imageUrls.length > 0) {
        for (let i = 0; i < imageUrls.length; i++) {
          URL.revokeObjectURL(imageUrls[i].file)
        }
      }
    }
  }, [imageUrls])

  React.useEffect(() => {
    setImagesOrder(imageNames)
  }, [imageNames])

  React.useEffect(() => {
    setImagesFile(imgFiles)
  }, [imgFiles])

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
