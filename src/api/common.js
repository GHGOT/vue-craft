import { postData } from "./index";

// 공통 현장 리스트
export const commonAgencyList = (params) => {
    return postData('/Agency/AgencyList', params)
}

// 공통 팀 리스트
export const commonTeamList = (params) => {
    return postData('/Team/AttTeamSelect', params)
}