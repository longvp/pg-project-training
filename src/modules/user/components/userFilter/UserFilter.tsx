import React from 'react'
import Select, { MultiValue, SingleValue } from 'react-select'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AppState } from '../../../../redux/reducer'
import { Action } from 'redux'
import { IFilterFieldUser } from '../../../../models/user'
import { setFilterFieldUser } from '../../redux/userReducer'
import { ICountry } from './../../../../models/country'
import { IRole } from '../../../../models/role'
import { IOption } from '../../../../models/option'
import { MEMBERSHIP_FILTER_OPTION, STATUS_OPTIONS } from '../../utils'
import FilterRangeDate from './FilterRangeDate'

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
  const [rangeDate, setRangeDate] = React.useState<string[]>([])

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
    label: 'Any Country',
    value: '',
  })

  const buildCountryOptions = (countryList: ICountry[]) => {
    const result: IOption[] = []
    result.push({ label: 'Any Country', value: '' })
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

  React.useEffect(() => {
    setFilterField({ ...filterField, date_range: rangeDate })
  }, [rangeDate])

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
            className="input-field"
            placeholder="Search keywords"
            name="search"
            value={filterField.search}
            onChange={(e) => handleChangeInput(e)}
          />
          {/* MEMBERSHIP */}
          <Select
            placeholder="All memberships"
            options={MEMBERSHIP_FILTER_OPTION}
            onChange={(e) => handleChangeMembershipSelect(e)}
            isMulti
          />
          {/* ROLE */}
          <Select
            placeholder="All user types"
            options={roleOptions}
            onChange={(e) => handleChangeRoleSelect(e)}
            isMulti
          />
          {/* STATUS */}
          <Select
            placeholder="Any status"
            value={statusSelected}
            options={STATUS_OPTIONS}
            onChange={(e) => handleChangeStatusSelect(e)}
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
              placeholder="Any Country"
              value={countrySelected}
              options={countryOptions}
              onChange={(e) => handleChangeCountrySelect(e)}
            />
            {/* STATE */}
            <input
              type="text"
              className="input-field"
              placeholder="State"
              name="state"
              value={filterField.state}
              onChange={(e) => handleChangeInput(e)}
            />
            {/* ADDRESS */}
            <input
              type="text"
              className="input-field"
              placeholder="Address"
              name="address"
              value={filterField.address}
              onChange={(e) => handleChangeInput(e)}
            />
            {/* PHONE */}
            <input
              type="text"
              className="input-field"
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
            {/* <div className="filter-date">
              <label>Enter range date</label>
              <input type="date" className="input-field" />
            </div> */}
            <FilterRangeDate setRangeDate={setRangeDate} />
          </div>
        </div>
      </div>
    </>
  )
}

export default UserFilter
