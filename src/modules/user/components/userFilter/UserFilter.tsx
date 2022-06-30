import React from 'react'
import Select, { MultiValue, SingleValue } from 'react-select'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './UserFilter.scss'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AppState } from '../../../../redux/reducer'
import { Action } from 'redux'
import { IFilterFieldUser } from '../../../../models/user'
import { setFilterFieldUser } from '../../redux/userReducer'
import { ICountry } from './../../../../models/country'
import { IRole } from '../../../../models/role'
import { MEMBERSHIP_OPTION, STATUS_OPTIONS } from '../../utils'
import { IOption } from '../../../../models/option'

const UserFilter = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>()

  const { filterFieldUser, countryList, roleList } = useSelector((state: AppState) => ({
    filterFieldUser: state.user.filterFieldUser,
    countryList: state.user.countryList,
    roleList: state.user.roleList,
  }))

  const [isShowFilterHide, setIsShowFilterHide] = React.useState<boolean>(false)

  const [filterField, setFilterField] = React.useState<IFilterFieldUser>({
    country: '',
    search: '',
    address: '',
    state: '',
    phone: '',
    types: [],
    date_range: [],
    date_type: 'R',
    memberships: [],
    order_by: 'DESC',
    sort: 'last_login',
    status: [],
    tz: 7,
  })

  React.useEffect(() => {
    if (filterFieldUser) {
      setFilterField({
        search: filterFieldUser.search,
        address: filterFieldUser.address,
        country: filterFieldUser.country,
        state: filterFieldUser.state,
        phone: filterFieldUser.phone,
        types: filterFieldUser.types,
        date_range: filterFieldUser.date_range,
        date_type: filterFieldUser.date_type,
        memberships: filterFieldUser.memberships,
        order_by: filterFieldUser.order_by,
        sort: filterFieldUser.sort,
        status: filterFieldUser.status,
        tz: filterFieldUser.tz,
      })
    }
  }, [filterFieldUser])

  // ---------------------- MEMBERSHIP OPTION -------------------------------------------

  // ---------------------- ROLE OPTION --------------------------------------
  const [roleOptions, setRoleOptions] = React.useState<IOption[]>([])

  const buildRoleOptions = (roleList: IRole[]) => {
    const result: IOption[] = []
    if (roleList && roleList.length > 0) {
      roleList.map((r) => {
        result.push({ label: r.name, value: '' + r.id })
      })
    }
    return result
  }

  React.useEffect(() => {
    if (roleList && roleList.length > 0) {
      setRoleOptions(buildRoleOptions(roleList))
    }
  }, [roleList])

  // ---------------------- STATUS OPTION -------------------------------------------
  const [statusSelected, setStatusSelected] = React.useState<SingleValue<IOption>>({
    label: STATUS_OPTIONS[0].label,
    value: STATUS_OPTIONS[0].value,
  })

  // ---------------------- COUNTRY OPTION --------------------------------------
  const [countryOptions, setCountryOptions] = React.useState<IOption[]>([])
  const [countrySelected, setCountrySelected] = React.useState<SingleValue<IOption>>({
    label: 'Select Country',
    value: '',
  })

  const buildCountryOptions = (countryList: ICountry[]) => {
    const result: IOption[] = []
    result.push({ label: 'Select Country', value: '' })
    if (countryList && countryList.length > 0) {
      countryList.map((c) => {
        result.push({ label: c.country, value: c.code })
      })
    }
    return result
  }

  React.useEffect(() => {
    if (countryList && countryList.length > 0) {
      setCountryOptions(buildCountryOptions(countryList))
    }
  }, [countryList])

  // ---------------------- LIST ACTION CHANGE --------------------------------------

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value
    setFilterField({ ...filterField, [name]: value })
  }

  const handleChangeMembershipSelect = (event: MultiValue<IOption>) => {
    let fieldMemberships: string[] = []
    fieldMemberships = event.map((e) => e.value)
    setFilterField({ ...filterField, memberships: fieldMemberships })
  }

  const handleChangeRoleSelect = (event: MultiValue<IOption>) => {
    let fieldTypes: string[] = []
    fieldTypes = event.map((e) => e.value)
    setFilterField({ ...filterField, types: fieldTypes })
  }

  const handleChangeStatusSelect = (e: SingleValue<IOption>) => {
    setStatusSelected(e)
    if (e) {
      const fieldStatus: string[] = []
      if (e.value) {
        fieldStatus.push(e.value)
      }
      setFilterField({ ...filterField, status: fieldStatus })
    }
  }

  const handleChangeCountrySelect = (e: SingleValue<IOption>) => {
    setCountrySelected(e)
    if (e) {
      setFilterField({ ...filterField, country: e?.value })
    }
  }

  //--------------------------- SEARCH ACTION ----------------------------
  const handleSearch = () => {
    dispatch(setFilterFieldUser(filterField))
  }

  return (
    <>
      <div className="filter">
        <div className="filter-show">
          <input
            type="text"
            className="input-filter"
            placeholder="Search keywords"
            name="search"
            value={filterField.search}
            onChange={(e) => handleChangeInput(e)}
          />
          {/* MEMBERSHIP */}
          <Select
            placeholder="All memberships"
            options={MEMBERSHIP_OPTION}
            onChange={(e) => handleChangeMembershipSelect(e)}
            isMulti
            className="select-filter"
            classNamePrefix="select"
          />
          {/* ROLE */}
          <Select
            placeholder="All user types"
            options={roleOptions}
            onChange={(e) => handleChangeRoleSelect(e)}
            isMulti
            className="select-filter"
            classNamePrefix="select"
          />
          {/* STATUS */}
          <Select
            placeholder="Any status"
            value={statusSelected}
            options={STATUS_OPTIONS}
            onChange={(e) => handleChangeStatusSelect(e)}
            className="select-filter"
            classNamePrefix="select"
          />
          <button type="button" className="btn-search" onClick={() => handleSearch()}>
            Search
          </button>
        </div>
        <span className="btn-toggle-filter" onClick={() => setIsShowFilterHide(!isShowFilterHide)}>
          <FontAwesomeIcon icon={isShowFilterHide ? faChevronUp : faChevronDown} />
        </span>
        <div className={`filter-hide ${isShowFilterHide ? 'show' : ''}`}>
          <div className="filter-left">
            {/* COUNTRY OPTIONS */}
            <Select
              placeholder="Select country"
              value={countrySelected}
              options={countryOptions}
              onChange={(e) => handleChangeCountrySelect(e)}
              className="select-filter"
              classNamePrefix="select"
            />
            {/* STATE */}
            <input
              type="text"
              className="input-filter"
              placeholder="State"
              name="state"
              value={filterField.state}
              onChange={(e) => handleChangeInput(e)}
            />
            {/* ADDRESS */}
            <input
              type="text"
              className="input-filter"
              placeholder="Address"
              name="address"
              value={filterField.address}
              onChange={(e) => handleChangeInput(e)}
            />
            {/* PHONE */}
            <input
              type="text"
              className="input-filter"
              placeholder="Phone"
              name="phone"
              value={filterField.phone}
              onChange={(e) => handleChangeInput(e)}
            />
          </div>
          <div className="filter-right">
            <div className="list-radio">
              <div className="radio">
                <input
                  type="radio"
                  name="date_type"
                  checked={filterField.date_type === 'R'}
                  value="R"
                  onChange={(e) => handleChangeInput(e)}
                />
                <label>Register</label>
              </div>
              <div className="radio">
                <input
                  type="radio"
                  name="date_type"
                  checked={filterField.date_type === 'L'}
                  value="L"
                  onChange={(e) => handleChangeInput(e)}
                />
                <label>Last logged in</label>
              </div>
            </div>
            <div className="filter-date">
              <label>Enter range date</label>
              <input type="date" className="input-filter" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserFilter
