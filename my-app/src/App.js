import { withRouter } from '@reyzitwo/react-router-vkminiapps';
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns'
import { View, 
	Panel, 
	PanelHeader, 
	Group, 
	TabbarItem, 
	Tabbar, 
	Epic,
	NativeSelect,
  Tabs,
  TabsItem,
  PanelHeaderBack,
  DateInput,
  Div,
  Input,
  IconButton,
  Button,
  
  } from '@vkontakte/vkui';
import { Icon28EducationOutline } from '@vkontakte/icons';
import { Icon28UsersOutline } from '@vkontakte/icons';
import { Icon28Notification } from '@vkontakte/icons';
import { Icon28MagnifierPlus } from '@vkontakte/icons';
import { Icon28BookmarkAddOutline } from '@vkontakte/icons';
import { Icon16Clear } from '@vkontakte/icons';

import '@vkontakte/vkui/dist/vkui.css';
import bridge from '@vkontakte/vk-bridge';
import './App.css';

bridge.send('VKWebAppShowSlidesSheet', {
  slides: [
    {
      media: {
        blob: `data:image/jpeg;base64,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`,
        type: 'image'
      },
      title: 'О приложении',
      subtitle: 'Данное приложение создано для показа расписания об учебных занятиях в РКСИ'
    },
    {
      media: {
        blob: `data:image/png;base64,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`,
        type: 'image'
      },
      title: 'Учебное расписание',
      subtitle: 'Здесь хранится информация об парах (учебных занятиях), проводимых в колледже'
    },
    {
      media: {
        blob: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHEAAAA6CAYAAACH4bZ/AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAALpSURBVHhe7Zr7TxpBEMfv//8PWmMfWqltI4+2PIwSfAW1EmtbiaUgvpDShy2VmkCATPmu2eu12SCCP9xM5pJPWLjZg+znZvb2Dq/f75PCG5UoAK/X65HCG5UoAK/b7ZLCG6/T6ZDCG6/VapHCG81EAahEAahEAahEAahEAahEAahEAahEAYiUmEiv0NxCyrlPImIkFj9WaHv3A92bWfCByOz6G7PP1UcKIiRCVFCeCwh29ZUAe4mjCLRIFcla4sWPplPWME5qdeexOMNa4m2y0II+rmNxhrVEl6SbkHjVylbiOKXUIq2kspWIZYNL0CioxJAwiURpV6lsJf6/sL8NKjEkqMS/qEQBqEQBsJU4zkLfgqccrmNyhaVELBFcckYFC35Jywx2EicVaIFIKY+o2El0CRkXKbfg2Emc5IImiGaiEipESUR2ubLOFSsJURJd91OllMxhiCuneEQFcZg70XbFSEPnRAGoRAGoRAGoRAGoRAGoRAGoRAGEUuLefommnsTMYn3m+WsqVY6dcco1oc7EdrtNS6tbFE/nnPuVa0It8ffVFaWWNyi5tE7N5iU9jWXoQSRBD+dfmvukp7XPJiad3aCp2SjdH5DIrFDz1yUV9oomHv3qja80+yJJB+UqLa9tm5MCd3Pm44vmJNl5u+/HFkuHND0XN/1dvymMhFYiBtqW06PTc18iBvf7xU/TRtnd3Hln2pAC0F7b3B0qMZrMmr9oAJwENrZW/2LEopSrxDtkq/DeDGyj8c0MtM3ESDRNZ+cNI2Uxl/fj0cZnkIDsfDSIRfx0JO5LRPvxs1dUPT4zfRAbiWZMRgO0VeIdgTkxP8i0oEQ7uMhUCHFlIj5DHNquTIylcpQdvOK46GOED7IP75GNwe/hQCglruYLZn6z5fTgU9UvpzYTkUnl6sk/cyJAO1giXRJxAiDGllQ88cA8iPkwWLZdvy2MhL6cKjejEgWgEgXglSuHpPDGI93YbyqR/Ub0B1/mutiudEkRAAAAAElFTkSuQmCC`,
        type: 'image'
      },
      title: 'Звокни',
      subtitle: 'Информация об актуальных расписаниях звонков на все случаи'
    },
    {
      media: {
        blob: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAAA2CAYAAABZV76QAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAMjSURBVHhe7ZiJTlNBFIb7/m+gmMgqLqzKprIWZKciFUGs7DZAhVRqLQ0kx/tPcpq5dQppPN4ZyWnype3Mmd7k6z9nepu6ubkhRY7U9fU1KXKkqtUqKXKkSqUSKXJoQoVRocKoUGFUqDAqVBgVKowKFUaFCqNChQlS6OZ2jiZml6mrd4QetPcaBkenzdj5RdG5JhSCEgpZEMcSG4GaUMUGIxSCbGlII5KKcXBwnI+lFs8hSg1CqC3zrvRhzk5xaFKDEMqC8Oyad8FJXcpknfO+8C7UTqcrbZAMefXjqGWpIaXUu1Ak7LaksWzX3F1rfeBdKG93HDqu+duEYg3mmmkV/xrvQl3CWLKL+u3vGvOJd6GuPoifR7ZEGzuN3H9VqAUL/Zstr0ItOI16KAnBKQOunz8Q7jp0eLs3WucL70IBb/tmTms+uJpZkwRBCEXCbKm3JQ5zLBM06r2+CEIogBiWCtAXMcZy+S89nmewRrd8A+rT1wjU2F9ASFKDEspAFh9GtjSM2VscEkOTGqTQZghN6n8vFNhSkWpXTVLcC6GAparQe4YKFUaFCqNChVGhwqhQYVSoMCpUmCCEDoxO0Xh6KTa2ur5J3f1jVCxemveH0T182/MhU4v3P8tlmozu7R91DZg7pPZobmtnN/YZPvAmtF4IeNw9SIurG3R1dRUTilrcAT3s6DNCMf92ZpGe9I3RwVGeKpUKpRcy1PrsFeX2Dp3XSwpvQhdWPhghhe8XtYTu7h9RWyQF/33aQlfeb5ra4fFZU3tWODe3mdlPO7XPK5d/Uc/QOE3OLceukzTehELg66l585qFQh4kQiYLRQI7e0ZoPbttalCbPzkzgo/zp398JrDHksab0OVM1qQMvZGFfoySiV6IbQuhkDYQbfWhN2mzzVnoyWmBOl4MOxM6M78Wu07SeBOKvjc9vxrroa1PX1JmY8vMQyh6JgRzElko5I5Nvqv1UPTY9MKaObT2j77FrpM03oTacELtMQhtiYSif/IYC8XrH5clGp2Yo5bOfvNlIO2fc3u1Wl8EIfQ+oUKFUaHCpL7kvpIiR4r0Ifgg+g3SF2g0RRq+lgAAAABJRU5ErkJggg==`,
        type: 'image'
      },
      title: 'ФИО',
      subtitle: 'В случае когда надо узнать имя отчество прпеподавателя, здесь можно набрав фамилию получить имя отчество'
    },
    {
      media: {
        blob: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAAA6CAYAAAA0qZ5lAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAOCSURBVHhe7ZgLTxpBEMfv+3+DprVarVJfKCoWfKCoRfFZtUaNtvVBqFqtCBo1Pqb81wzZXhbUxuUWHJJfcs7OLuHn3N7Oeff39yTYw7u7uyPBHiLYMt7t7S0J9hDBlvFubm5IsId3fX1Ngj28QqFAgj2kgi0jgi0jgi0jgi0jgi0jgi0jgi0jgi3jnOD04qqitXuQ3jR3l8Dfu5nsP7lrG9sU+TxeGsc15uo5QeOM4JM/uZIsE7rgp+Qix/8dQeCMYF3YY1XolwvxEKrHkGOaW22cEIxbXZdlymH0XIbH/HHk6nODwAnBo5OzTxbCuTo85o+7UMVOCOYH2lP2Tc6tVOm8XSDXNF5NnBDMFWca88OCK1U75D9nTZvUnGDT6YHH/HFsJ/rcIKg5wc95yD32wKwGNScY+KsY0vVtAcgxTYOlmMZMPNZouCIX1KRgBg0Ji8bDD9fSKhv4X8G1gAi2TF0JxjbhQnOhU1eCX2qdl6RmBOMY9ti5VgSXoZIYSOX2GOC6nOhK6wSF04Jx5OIxPobxtek4Vm6dIHFWsN5IsEw0GLp0f0PBcT0WNE4IZploeSGRt4Ry2wFiLJNz+B2FX3rQOCHY9AIH4iq9H9b/ETpYy5QfFE4I5lsfwoBpfzXB81C1z5lXTZwQXM+IYMuIYMuIYMuIYMuIYMuIYMtURXAytUBvW8KqEWgLxyiTPTTm1SNVreDziwvq/TxGIxNp43g9UlXBubM8dQ2M0MT0IuXzBSW7MdRH71p7KTE1S6enZxTqiVFzxwAdHP5Wc+JjKWoojq9v/VCdW89gQs350N5Pm9s7NP91Tc3J5fKUPTiils6oytXj/P2mmG2qIhg/CD8MW0RHZIgOjo7p6uqKCufnanz526Zqdff2f1Fn3zB97BqkxZV1Oj45VfkQCmmQHUt8UXOn0ksUjiZottgev3rBDMQMJ2dU5UJufGxaVWvTp4eK/LmTUYIRRw4kR2LjJWmIvW+LUFMxF4SjozQzv6L2d6zRWKSh7aHaIZPjiOEOmVuqc8GXl5c0NP4gb2l1g0LFBx5ue1QwRLNgiG0vVi6u0wurJcH98QmKDk+qdXhNvSrLVTBfp+aW61NwfzxZep2IU8ReJqtOEtgKGkMRVYkQw4IhCNsBJO/uZ0vSMAfzUZGo4GRqvqLgV1fBrxERbBkRbBlva/s7CfbwSD4WP0R/AZ7D1rOxeoJuAAAAAElFTkSuQmCC`,
        type: 'image'
      },
      title: 'Замены',
      subtitle: 'Отражены все замены по указанным периодам и датам. Дополняются по мере поступления информации в районе 16:00 каждый день.'
    }
   ]})
  .then((data) => { 
    if (data.result) {
      // Слайды показаны
    }
  })
  .catch((error) => {
    // Ошибка
    console.log(error);
  });

// Sends event to client
bridge.send('VKWebAppInit');

// Subscribes to event, sended by client
bridge.subscribe(e => console.log(e));



const App = (props)=>{
	const [teachersDataList, setTeachersDataList] = useState([]);
	const [groupsDataList,setGroupsDataList] = useState([]);
	const [selectedTeacher, setSelectedTeacher] = useState(null);
	const [selectedGroup, setSelectedGroup] = useState(null);
	const [dataFromRequestByTeacherOrGroup,setdataFromRequestByTeacherOrGroup]=useState(null);
  
	const setActiveView = (e)=> props.router.toView(e.currentTarget.dataset.id); 

  const [enableTime, setEnableTime] = useState(false);
  const [disablePast, setDisablePast] = useState(false);
  const [disableFuture, setDisableFuture] = useState(false);
  const [disablePickers, setDisablePickers] = useState(false);
  const [closeOnChange, setCloseOnChange] = useState(true);
  const [showNeighboringMonth, setShowNeighboringMonth] = useState(false);
  const [disableCalendar, setDisableCalendar] = useState(false);

  const [valueDate, setValueDate] = useState(() => new Date());

  const textInput = React.createRef();
  const clear = () => (textInput.current.value = '');

  const handleChangeDate = (e) => {
    setValueDate(e);
    GetDate(valueDate, selectedGroup);
  };

  const handleChangeDateGroup = (e) => {
    setSelectedGroup(e.target.value);
    GetDate(valueDate, selectedGroup);
  };

  function GetDate(datetime, group){   
    console.log('hello getdate')
    if (typeof selectedGroup !== "string"){return} 
    console.log('i not return')
    console.log(datetime)
    let data
    fetch(`http://45.155.207.232:8080/api/v2/changes/${format(datetime, 'yyyy-MM-dd')}`)
        .then((response) => response.json())
        .then((data) => {
          data = JSON.parse(data);
          console.log(data)
          let result = '<div class="d-div-change">'
          data.forEach(innerArr => {
            if (group !== innerArr[1]){return}
            if (innerArr[8] !== -1){
              result += `<span class="e-s-change"><span>${innerArr[1]}</span><span>Пара ${innerArr[0]}</span><span>Вместо ${innerArr[2]} (${innerArr[3]}) 
                          будет ${innerArr[4]} (${innerArr[5]}) на паре ${innerArr[8]}</span></span>`
            }else{
              result += `<span class="e-s-change"><span>${innerArr[1]}</span><span>Пара ${innerArr[0]}</span>${innerArr[2]} (${innerArr[3]}) 
                          заменена на другой день</span>`
            };
          });
          result += "</div>"

          document.getElementById('change-date').innerHTML = result;
        });

        
  };

	useEffect(() => {
    fetch('http://45.155.207.232:8080/api/v2/schedule/list')
      .then(res => res.json())
      .then(data => {
        setTeachersDataList(data.teacher);
        setGroupsDataList(data.group);
      });
      
  }, []);

  function handleButtonClick(){
    let url;
    if(props.router.activePanel==='teacher'){
      url=`http://45.155.207.232:8080/api/v2/schedule/${selectedTeacher}`;
    }
    else{
      url=`http://45.155.207.232:8080/api/v2/schedule/${selectedGroup}`;
    }
	setdataFromRequestByTeacherOrGroup("Wait");
    fetch(url)
      .then(res=>res.json())
      .then(data=>{
		let result = ``;
		  data.days.forEach(day => {
			result += `<div class="day"><span class="day_ico"></span><span class="day-text">${day.day}</span>`;
			day.apairs.forEach(apair => {
			  result += `<div class="pair" id="pair">`
			  apair.apair.forEach(item => {
				result += `
        <div><span id="time_pair"><div class="text-style">⏳${item.start} - ${item.end}</div></span></div>
				<div><img class="doctrine_ico image_ico_pair" src=""/><span id="doctrine" class="text_style_2">📖${item.doctrine}</span></div>
				<div><img class="teacher_ico image_ico_pair" src=""/><span id="teacher" class="text_style_2">🎓${item.teacher}</span></div>
				<div><img class="auditoria_ico image_ico_pair" src=""/><span id="auditoria" class="text-style">🔑${item.auditoria}</span></div>`;
				
			  });
        result += `</div>`
			});
      result += `</div>`	
			result += `</div>`			
		  });
		result += `</div>`		
    document.getElementById('schedule').innerHTML = result;

      })
  }
 return(
  <Epic activeStory={props.router.activeView} tabbar={
    <Tabbar>
      <TabbarItem
        onClick={setActiveView}
        selected={props.router.activeView === 'teacher'}
        data-id="teacher"
        text="Преподаватели"
      >
       <Icon28EducationOutline />
      </TabbarItem>
      <TabbarItem
        onClick={setActiveView}
        selected={props.router.activeView === 'group'}
        data-id="group"
        text="Группы"
      >
       <Icon28UsersOutline/>
      </TabbarItem>  
	  <TabbarItem
        onClick={setActiveView}
        selected={props.router.activeView === 'calling'}
        data-id="calling"
        text="Звонки"
      >
       <Icon28Notification/>
      </TabbarItem> 	
	  <TabbarItem
        onClick={setActiveView}
        selected={props.router.activeView === 'fio'}
        data-id="fio"
        text="ФИО"
      >
       <Icon28MagnifierPlus/>
      </TabbarItem> 
	  <TabbarItem
        onClick={setActiveView}
        selected={props.router.activeView === 'changing'}
        data-id="changing"
        text="Замены"
      >
       <Icon28BookmarkAddOutline/>
      </TabbarItem> 	
        
    </Tabbar>
  }>
    <View id={props.router.activePanel} activePanel={props.router.activePanel}>

      <Panel id="teacher">
        <PanelHeader><div class="style_header">📚 Расписание преподавателей</div></PanelHeader>
        <Group>
          <NativeSelect onChange={(e)=>setSelectedTeacher(e.target.value)} onClick={handleButtonClick}>
            {teachersDataList.map((item,index)=><option key={index} value={item}>{item}</option>)}
          </NativeSelect>
        </Group>
        <Group id="schedule">{dataFromRequestByTeacherOrGroup && (<div>{dataFromRequestByTeacherOrGroup}</div>)}</Group>
      </Panel>
      
      <Panel id="group">
        <PanelHeader><div class="style_header">📚 Расписание групп</div></PanelHeader>
         <Group>
          <NativeSelect onChange={(e)=>setSelectedGroup(e.target.value)} onClick={handleButtonClick}>
              {groupsDataList.map((item,index)=><option key={index} value={item}>{item}</option>)}
          </NativeSelect>
        </Group>
		  <Group id="schedule">{dataFromRequestByTeacherOrGroup && (<div>{dataFromRequestByTeacherOrGroup}</div>)}</Group>
      </Panel>

	    <Panel id="calling" >
        <PanelHeader>Звонки</PanelHeader>
        <Group>
          <Tabs>
            <TabsItem onClick={setActiveView} data-id="call_normal" selected={props.router.activeView === 'call_normal'}>Нормальное</TabsItem>
            <TabsItem onClick={setActiveView} data-id="call_short" selected={props.router.activeView === 'call_short'}>Сокращенное</TabsItem>
            <TabsItem onClick={setActiveView} data-id="call_spec_hour" selected={props.router.activeView === 'call_spec_hour'}>С классным часом</TabsItem>
          </Tabs>
        </Group>
      </Panel>

      <Panel id="fio" >
        <PanelHeader>ФИО</PanelHeader>
        <Group>
        <Div>
          <Input
            getRef={textInput}
            type="text"
            placeholder="Введите фамилию"
            defaultValue="Шашкин"
            after={
              <IconButton hoverMode="opacity" aria-label="Очистить поле" onClick={clear}>
                <Icon16Clear />
              </IconButton>
            }
          />
        </Div>
        <Div>
          <Button size='l'>Показать</Button>
        </Div>
        </Group>
      </Panel>

      <Panel id="changing">
        <PanelHeader>Замены</PanelHeader>
        <Group>
        <Div>
          <Div>
            <DateInput value={valueDate} 
                    onChange={handleChangeDate}  
                    enableTime={enableTime}
                    disablePast={disablePast}
                    disableFuture={disableFuture}
                    closeOnChange={closeOnChange}
                    disablePickers={disablePickers}
                    showNeighboringMonth={showNeighboringMonth}
                    disableCalendar={disableCalendar}/>
            </Div>
          <Div>
            <NativeSelect onChange={(e)=>setSelectedGroup(e.target.value)} onClick={handleChangeDateGroup}>
                  {groupsDataList.map((item,index)=><option key={index} value={item}>{item}</option>)}
            </NativeSelect>
          </Div>
        </Div>
        <Group>
          <Div id="change-date"></Div>
        </Group>
        </Group>
      </Panel>

      <Panel id="call_normal">
      <PanelHeader before={<PanelHeaderBack onClick={setActiveView} data-id="calling" />}>Звонки</PanelHeader>
        <Group>
          <div class="call-style">
            <Div><span class="call_header"></span><div class="text_style_2">✔ Обычное раписание</div></Div>
            <Div><span class="call_firust-p"></span><div class="time">🔔 08:00 — 09:30</div></Div>
            <Div><span class="call_two-p"></span><div class="time">🔔 09:40 — 11:10</div></Div>
            <Div><span class="call_three-p"></span><div class="time">🔔 11:30 — 13:00</div></Div>
            <Div><span class="call_four-p"></span><div class="time">🔔 13:10 — 14:40</div></Div>
            <Div><span class="call_five-p"></span><div class="time">🔔  15:00 — 16:30</div></Div>
            <Div><span class="call_six-p"></span><div class="time">🔔 16:40 — 18:10</div></Div>
            <Div><span class="call_seven-p"></span><div class="time">🔔 18:20 — 19:50</div></Div>
          </div>
        </Group>  
      </Panel>
      <Panel id="call_short">
      <PanelHeader before={<PanelHeaderBack onClick={setActiveView} data-id="calling" />}>Звонки</PanelHeader>
      <Group>
        <div class="call-style">
            <Div><span class="call_header"></span><div class="text_style_2">✔ Обычное раписание</div></Div>
            <Div><span class="call_firust-p"></span><div class="time">🔔 08:00 — 08:50</div></Div>
            <Div><span class="call_two-p"></span><div class="time">🔔 09:00 — 09:50</div></Div>
            <Div><span class="call_three-p"></span><div class="time">🔔 10:00 — 10:50</div></Div>
            <Div><span class="call_four-p"></span><div class="time">🔔 11:00 — 11:50</div></Div>
            <Div><span class="call_five-p"></span><div class="time">🔔 12:00 — 12:50</div></Div>
            <Div><span class="call_six-p"></span><div class="time">🔔 13:00 — 13:50</div></Div>
            <Div><span class="call_seven-p"></span><div class="time">🔔 14:00 — 14:50</div></Div>
          </div>
        </Group>   
      </Panel>
      <Panel id="call_spec_hour">
      <PanelHeader before={<PanelHeaderBack onClick={setActiveView} data-id="calling" />}>Звонки</PanelHeader>
      <Group>
          <div class="call-style">
            <Div><span class="call_header"></span><div class="text_style_2">✔ Обычное раписание</div></Div>
            <Div><span class="call_firust-p"></span><div class="time">🔔 08:00 — 09:30</div></Div>
            <Div><span class="call_two-p"></span><div class="time">🔔 09:40 — 11:10</div></Div>
            <Div><span class="call_three-p"></span><div class="time">🔔 11:30 — 13:00</div></Div>
            <Div><span class="call_four-p"></span><div class="time">🔔 13:05 — 13:35</div></Div>
            <Div><span class="call_five-p"></span><div class="time">🔔  13:40 — 15:10</div></Div>
            <Div><span class="call_six-p"></span><div class="time">🔔 15:30 — 17:00</div></Div>
            <Div><span class="call_seven-p"></span><div class="time">🔔 17:10 — 18:40</div></Div>
          </div>
        </Group>    
      </Panel>

    </View>
     
  </Epic>
 );
}

export default withRouter(App);