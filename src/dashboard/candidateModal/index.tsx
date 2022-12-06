import { Avatar, Button, Col, Divider, Drawer, Row } from 'antd'
import { UserOutlined, DownloadOutlined } from '@ant-design/icons'
import moment from 'moment'
import { useEffect, useState } from 'react'
import styled from '@emotion/styled'

import AnswerBox from '../../common/AnswerBox'
import {
  GENERAL_QUESTION,
  IQuestion,
  MAJOR,
  MAJOR_QUESTION,
  QUESTION_TYPES,
} from '../../utils/const'
import DesignAnswerModal from '../DesignAnswerModal'
import { loader, LoaderData } from './loader'
import { useFetcher } from 'react-router-dom'

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 25px;
`

const SubHeader = styled.h2`
  margin: 0;
  color: #333;
  font-size: 20px;
  font-weight: bold;

  margin-bottom: 10px;
`

const QuestionHeader = styled.h3`
  margin: 0;
  color: #333;
  font-size: 16px;

  margin-bottom: 10px;
`

interface CandidateModalProps {
  candidateId: string
  visible: boolean
  onClose: () => void
}

const CandidateModal = ({
  visible,
  onClose,
  candidateId,
}: CandidateModalProps) => {
  const [viewQuestion, setViewQuestion] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [portfolioUrl, setPortfolioUrl] = useState('')

  const { load, data } = useFetcher<LoaderData>()
  useEffect(() => {
    if (!candidateId) return
    load(`/candidateModal/${candidateId}`)
  }, [load, candidateId])

  const candidate = !candidateId || candidateId === data?.id ? data : undefined

  const openDrawer = (url: string) => {
    setModalVisible(true)
    setPortfolioUrl(url)
  }

  const closeDrawer = () => {
    setModalVisible(false)
    setPortfolioUrl('')
  }

  const printDocument = () => {
    const elem = document.getElementById('printable') as HTMLElement
    const domClone = elem.cloneNode(true) as Node

    let printSection = document.getElementById('print-section') as HTMLElement

    if (!printSection) {
      printSection = document.createElement('div')
      printSection.id = 'print-section'
      document.body.appendChild(printSection)
    }

    printSection.innerHTML = ''
    printSection.appendChild(domClone)
    window.print()
  }

  return (
    <>
      <DesignAnswerModal
        visible={modalVisible}
        onClose={closeDrawer}
        url={portfolioUrl}
      />
      <Drawer
        open={visible}
        onClose={onClose}
        maskClosable={false}
        title={
          <Header>
            <span>รายละเอียดใบสมัคร</span>
            {!!candidate ? (
              <Button onClick={printDocument}>พิมพ์</Button>
            ) : null}
          </Header>
        }
        width="50%"
      >
        {!candidate ? (
          <h1>Loading...</h1>
        ) : (
          <div id="printable">
            <Row className="print-flex">
              <Col md={4}>
                <a
                  href={candidate.picture ?? ''}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Avatar
                    shape="square"
                    size={96}
                    icon={<UserOutlined />}
                    src={candidate.picture}
                    style={{ marginRight: 30 }}
                  />
                </a>
              </Col>
              <Col md={20}>
                <SubHeader>
                  {candidate.title} {candidate.firstName} {candidate.lastName} (
                  {candidate.nickname})
                </SubHeader>
                <table>
                  <tbody>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>สาขาที่สมัคร</b>
                      </td>
                      <td>{MAJOR(candidate.major)}</td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>วัน-เดือน-ปีเกิด</b>
                      </td>
                      <td>
                        {candidate.birthdate
                          ? moment(candidate.birthdate).calendar()
                          : 'ยังไม่ได้กรอก'}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>ศาสนา</b>
                      </td>
                      <td>
                        {candidate.religion
                          ? candidate.religion
                          : 'ยังไม่ได้กรอก'}
                      </td>
                    </tr>
                    <tr className="print-hide">
                      <td style={{ paddingRight: '20px' }}>
                        <b>เบอร์โทรศัพท์</b>
                      </td>
                      <td>
                        {candidate.phone ? candidate.phone : 'ยังไม่ได้กรอก'}
                      </td>
                    </tr>
                    <tr className="print-hide">
                      <td style={{ paddingRight: '20px' }}>
                        <b>อีเมล์</b>
                      </td>
                      <td>
                        {candidate.email ? candidate.email : 'ยังไม่ได้กรอก'}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>ระดับการศึกษา</b>
                      </td>
                      <td>
                        {candidate.educationStatus
                          ? candidate.educationStatus
                          : 'ยังไม่ได้กรอก'}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>ชั้นปี</b>
                      </td>
                      <td>
                        {candidate.academicYear
                          ? candidate.academicYear
                          : 'ยังไม่ได้กรอก'}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>มหาวิทยาลัย</b>
                      </td>
                      <td>
                        {candidate.university
                          ? candidate.university
                          : 'ยังไม่ได้กรอก'}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>คณะ</b>
                      </td>
                      <td>
                        {candidate.faculty
                          ? candidate.faculty
                          : 'ยังไม่ได้กรอก'}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>สาขาวิชา</b>
                      </td>
                      <td>
                        {candidate.department
                          ? candidate.department
                          : 'ยังไม่ได้กรอก'}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>โรคประจำตัว</b>
                      </td>
                      <td>
                        {candidate.disease
                          ? candidate.disease
                          : 'ยังไม่ได้กรอก'}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>สิ่งที่แพ้ / อาหารที่แพ้</b>
                      </td>
                      <td>
                        {candidate.foodAllergy
                          ? candidate.foodAllergy
                          : 'ยังไม่ได้กรอก'}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>ยาที่แพ้</b>
                      </td>
                      <td>
                        {candidate.medAllergy
                          ? candidate.medAllergy
                          : 'ยังไม่ได้กรอก'}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>ไซส์เสื้อ</b>
                      </td>
                      <td>
                        {candidate.shirtSize
                          ? candidate.shirtSize
                          : 'ยังไม่ได้กรอก'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Col>
            </Row>
            <Divider />
            <SubHeader className="print-hide">ข้อมูลติดต่อฉุกเฉิน</SubHeader>
            <table className="print-hide">
              <tbody>
                <tr>
                  <td style={{ paddingRight: '20px' }}>
                    <b>ชื่อ</b>
                  </td>
                  <td>
                    {candidate.emergencyFirstName
                      ? `${candidate.emergencyFirstName} ${candidate.emergencyLastName}`
                      : 'ยังไม่ได้กรอก'}
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingRight: '20px' }}>
                    <b>เบอร์โทรศัพท์</b>
                  </td>
                  <td>
                    {candidate.emergencyPhone
                      ? candidate.emergencyPhone
                      : 'ยังไม่ได้กรอก'}
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingRight: '20px' }}>
                    <b>ความเกี่ยวข้อง</b>
                  </td>
                  <td>
                    {candidate.emergencyPhoneRelated
                      ? candidate.emergencyPhoneRelated
                      : 'ยังไม่ได้กรอก'}
                  </td>
                </tr>
              </tbody>
            </table>
            <Divider className="print-hide" />
            <SubHeader>คำตอบกลาง และ คำตอบสาขา</SubHeader>
            <Row className={`${viewQuestion ? 'screen-show' : 'screen-hide'}`}>
              <Col md={24}>
                {candidate.questions.generalQuestions.length > 0 && (
                  <>
                    <QuestionHeader>คำตอบกลาง</QuestionHeader>
                    {GENERAL_QUESTION.map((question: IQuestion, i) => (
                      <Row key={i}>
                        <Col
                          md={24}
                          dangerouslySetInnerHTML={{
                            __html: question.title,
                          }}
                        />
                        <Col md={24}>
                          {candidate.questions.generalQuestions[i] && (
                            <AnswerBox
                              disabled={true}
                              autoSize={true}
                              value={
                                candidate.questions.generalQuestions[i].answer
                              }
                            />
                          )}
                        </Col>
                      </Row>
                    ))}
                  </>
                )}
                {candidate.questions.majorQuestions.length > 0 && (
                  <>
                    <QuestionHeader>คำตอบสาขา</QuestionHeader>
                    {MAJOR_QUESTION(candidate.major).map(
                      (question: IQuestion, i) => {
                        const answer = candidate.questions.majorQuestions[i]
                          ? candidate.questions.majorQuestions[i].answer
                          : ``

                        return (
                          answer && (
                            <Row key={i}>
                              <Col
                                md={24}
                                dangerouslySetInnerHTML={{
                                  __html: question.title,
                                }}
                              />
                              {question.type === QUESTION_TYPES.FILE ? (
                                <Col md={24}>
                                  <Button
                                    icon={<DownloadOutlined />}
                                    className="print-hide"
                                    onClick={() => openDrawer(answer)}
                                  >
                                    ดูคำตอบ
                                  </Button>
                                  <AnswerBox
                                    className="screen-hide"
                                    disabled={true}
                                    autoSize={true}
                                    value={answer}
                                  />
                                  <br />
                                  <br />
                                </Col>
                              ) : (
                                <Col md={24}>
                                  <AnswerBox
                                    disabled={true}
                                    autoSize={true}
                                    value={answer}
                                  />
                                </Col>
                              )}
                            </Row>
                          )
                        )
                      }
                    )}
                  </>
                )}
              </Col>
              <Col md={24}>
                <Button
                  className="print-hide"
                  onClick={() => setViewQuestion(false)}
                >
                  ปิดคำตอบ
                </Button>
              </Col>
            </Row>
            <Row
              className={`${
                !viewQuestion ? 'screen-show' : 'screen-hide'
              } print-hide`}
            >
              <Col md={24}>
                <Button onClick={() => setViewQuestion(true)}>ดูคำตอบ</Button>
              </Col>
            </Row>
            <Divider />
            <Row className="print-hide">
              <Col md={12}>
                <table>
                  <tbody>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>วันที่ Login ครั้งแรก</b>
                      </td>
                      <td>
                        {moment(candidate.createdAt).format(
                          'DD/MM/YYYY, h:mm:ssa'
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>วันที่กดส่งใบสมัคร</b>
                      </td>
                      <td>
                        {candidate.completedAt
                          ? moment(candidate.completedAt).format(
                              'DD/MM/YYYY, h:mm:ssa'
                            )
                          : 'ยังไม่ส่งใบสมัคร'}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>ผ่านรอบคำถามกลาง</b>
                      </td>
                      <td>{candidate.isPassStaff ? 'ผ่าน' : 'ไม่ผ่าน'}</td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>ผู้ตรวจคำถามกลาง</b>
                      </td>
                      <td>{candidate.staffUsername}</td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>วันที่ตรวจคำถามกลาง</b>
                      </td>
                      <td>
                        {candidate.staffCheckedAt
                          ? moment(candidate.staffCheckedAt).format(
                              'DD/MM/YYYY, h:mm:ssa'
                            )
                          : 'ยังไม่ทำการตรวจ'}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>คอมเมนต์</b>
                      </td>
                      <td>
                        {candidate.staffComment ? candidate.staffComment : '-'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Col>
              <Col md={12}>
                <table>
                  <tbody>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>ผ่านคำถามสาขา</b>
                      </td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>จำนวนผู้ให้ผ่าน</b>
                      </td>
                      <td>
                        {candidate.committeeVote.reduce(
                          (a, vote) => a + vote.score,
                          0
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>ผู้ตรวจคำถามสาขา</b>
                      </td>
                      <td>
                        {candidate.committeeVote.length
                          ? candidate.committeeVote.map(
                              (c) => `${c.committee} `
                            )
                          : 'ยังไม่มีตรวจ'}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>ผ่านเข้ารอบสัมภาษณ์</b>
                      </td>
                      <td>{candidate.passInterview ? 'ผ่าน' : 'ไม่ผ่าน'}</td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>มาสัมภาษณ์</b>
                      </td>
                      <td>lul</td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>ผ่านรอบสัมภาษณ์</b>
                      </td>
                      <td>lul</td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '20px' }}>
                        <b>มีสิทธิ์เข้าค่าย</b>
                      </td>
                      <td>{candidate.isFinalist ? 'ผ่าน' : 'ไม่ผ่าน'}</td>
                    </tr>
                  </tbody>
                </table>
              </Col>
            </Row>
          </div>
        )}
      </Drawer>
    </>
  )
}

export default CandidateModal

export const candidateModalRoute = {
  path: '/candidateModal/:candidateId',
  loader,
}
