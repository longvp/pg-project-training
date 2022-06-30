import React from 'react'
import FormAddUser from './../../components/formAddUser/FormAddUser'
import { IUserCreate } from '../../../../models/user'

const AddUser = () => {
  const handleCreate = (values: IUserCreate) => {
    console.log('create: ', values)
  }

  return (
    <>
      <div className="page-manage">
        <div className="title">Create Profile</div>
        <FormAddUser handleCreate={handleCreate} />
      </div>
    </>
  )
}

export default AddUser
