import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { API } from '../../config';
import styled from 'styled-components';


const Table = styled.table`
    border: 2px solid red;
    border-collapse: collapse;
`;

const UpdatePlayer = () => {
    const location = useLocation();
    const playerId = location.state?.playerId;
    const competitionId = playerId.charAt(0);
    const [department, setDepartment] = useState([]);
    const [checkedList, setCheckedList] = useState([]);
    const [events, setEvents] = useState([]);
    const [playerInfo, setPlayerInfo] = useState({
        cmptAttendId: '',
        departId: '',
        playerBirth: '',
        playerName: '',
        playerGender: '',
        playerTel: '',
        playerAffiliation: '',
    });

    const handlePlayerState = (e) => {
        setPlayerInfo({ ...playerInfo, [e.target.name]: e.target.value });
    };

    const onCheckHandler = (value, isChecked) => {
        if (isChecked) {
            setCheckedList((prevState) => {
                return [...prevState, value];
            });
        };

        if (!isChecked && checkedList.includes(value)) {
            setCheckedList(checkedList.filter((item) => item !== value));
        };

    };

    const onUpdateSubmit = (e) => {
        e.preventDefault();
        if (window.confirm('정말로 수정하시겠습니까?')) {
            axios.patch(`${API.ATTEND_UPDATE_PLAYER}/${playerId}`, {
                ...playerInfo,
                cmptEventIds: checkedList
            });
        }
        // else{
        //     alert('취소되었습니다.');
        // }
    };

    useEffect(() => {
        // 선수 정보 가져오는 api
        axios.get(`${API.ATTEND_FIND_PLAYER}/${playerId}`).then(
            (res) => setPlayerInfo({
                cmptAttendId: res.data.cmptAttendId,
                departId: res.data.departId,
                playerBirth: res.data.playerBirth,
                playerName: res.data.playerName,
                playerGender: res.data.playerGender,
                playerTel: res.data.playerTel,
                playerAffiliation: res.data.playerAffiliation,
                cmptEventIds: res.data.cmptEventIds
            })
        );
        axios.get(`${API.COMPETITION_EVENT_FIND}/${competitionId}?type=ALL`).then(
            (res) => setEvents(res.data.filter((event) => event.isProceed === true))
        );

        axios.get(`${API.DEPART_FIND_ALL}`).then((res) => setDepartment(res.data));
    }, [playerId]);

    console.log()

    return (
        <div>
            <form>
                <input type="hidden" id="cmptAttendId" name="cmptAttendId" />

                <label htmlFor="departmentName">부서명</label>
                <select type="text" id="departmentName" name="departmentName" value={playerInfo.departId} onChange={handlePlayerState}>
                    {department.map(({departId, departName}) => (<option kee={departId+departName} value={departId}>{departName}</option>))}
                </select>

                <label htmlFor="playerBirth">생년월일</label>
                <input type="date" id="playerBirth" name="playerBirth" value={playerInfo.playerBirth} onChange={handlePlayerState} />

                <label htmlFor="playerName">선수명</label>
                <input type="text" id="playerName" name="playerName" value={playerInfo.playerName} onChange={handlePlayerState} />

                <label htmlFor="playerGender">성별</label>
                <select id="playerGender" name="playerGender" value={playerInfo.playerGender} onChange={handlePlayerState} >
                    <option value="남">남</option>
                    <option value="여">여</option>
                </select>

                <label htmlFor="playerTel">전화번호</label>
                <input type="text" id="playerTel" name="playerTel" value={playerInfo.playerTel} onChange={handlePlayerState} />

                <label htmlFor="playerAffiliation">소속명</label>
                <input type="text" id="playerAffiliation" name="playerAffiliation" value={playerInfo.playerAffiliation} onChange={handlePlayerState} />

                <br /><label htmlFor="events">참가종목 선택</label>
                <Table id="events">
                    <thead>
                        <tr>
                            <th>check</th>
                            <th>이름</th>
                        </tr>
                    </thead>
                    <tbody style={{ textAlign: "center" }}>
                        {events.map(({ eventName, eventId }) => (
                            <tr key={eventName}>
                                <td><input type="checkbox" onChange={(e) => onCheckHandler(eventId, e.target.checked)} /></td>
                                <td>{eventName}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <input type="submit" onClick={onUpdateSubmit} value="수정하기" />
            </form>
        </div>
    );
};

export default UpdatePlayer;