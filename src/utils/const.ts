interface MajorDetail {
  color: string
  name: string
  value: string
}

interface StepDetail {
  text: string
  value: string
}

export const MAJOR = (major: string): string => {
  const majors = [
    {
      color: 'purple',
      name: 'คอนเทนท์',
      value: 'content'
    },
    {
      color: 'magenta',
      name: 'ดีไซน์',
      value: 'design'
    },
    {
      color: 'volcano',
      name: 'มาร์เก็ตติ้ง',
      value: 'marketing'
    },
    {
      color: 'geekblue',
      name: 'โปรแกรมมิ่ง',
      value: 'programming'
    }
  ]

  const result = majors.find((m: MajorDetail) => m.value === major) || {
    name: ''
  }

  return result.name
}

export const STEP = (step: string): string => {
  const steps = [
    {
      text: 'ข้อมูลส่วนตัว',
      value: 'info'
    },
    {
      text: 'ข้อมูลการติดต่อ',
      value: 'contact'
    },
    {
      text: 'คำถามกลาง',
      value: 'general'
    },
    {
      text: 'คำถามสาขา',
      value: 'major'
    },
    {
      text: 'สรุปข้อมูล',
      value: 'summary'
    }
  ]

  const result = steps.find((s: StepDetail) => s.value === step) || {
    text: ''
  }

  return result.text
}

export const GENERAL_QUESTION = [
  '“Social Change, Arrange The World มิติใหม่เว็บสร้างสังคม” สำหรับน้องๆ หมายความว่าอย่างไร',
  'หากน้องๆ มีอำนาจพอที่จะสามารถเปลี่ยนแปลงสังคมได้ 1 สิ่ง จะเลือกเปลี่ยนแปลงอะไรก่อน และจะเลือกเปลี่ยนแปลงด้วยวิธีการใด เพราะเหตุใด',
  'น้องๆ คาดหวังอะไรจากการเข้าค่าย YWC17 ในปีนี้'
]

export const MAJOR_QUESTION = (major: string) => {
  switch (major) {
    case 'content':
      return [
        'ให้น้องเขียน Fake News หรือ Fake Content เรื่องอะไรก็ได้ ที่ทำให้กรรมการอ่านแล้วรู้สึกเชื่อจนเผลอแชร์ก่อนเช็ค (ส่งคอนเทนต์นี้ในเว็บค่ายเท่านั้น ห้ามเผยแพร่คอนเทนต์ออกไปในโซเชียล)',
        'ให้น้องเขียนคอนเทนต์แก้ Fake News/Content ในข้อ 1 ที่ทำให้กรรมการอ่านแล้วอยากแชร์เพื่อแก้ข่าว'
      ]
    case 'design':
      return [
        'ทำไมเราถึงต้องเลือกน้องให้เข้ามาเป็นหนึ่งใน Young Webmaster Camp สาขา Web Design',
        'ยกตัวอย่างเว็บไซต์หรือแอพพลิเคชั่นที่มีส่วนช่วยสังคมมา 1 ตัวอย่าง พร้อมทั้งอธิบายถึงเหตุผลที่เลือก',
        'จงยกตัวอย่างเว็บไซต์หน่วยงานภาครัฐที่น้องอยากทำการ Re-design UI และ UX มา 1 เว็บไซต์ พร้อมบอกเหตุผลที่เลือก และบอกจุดที่ควรจะแก้ไข และแนวทางในการแก้ปัญหา 3 จุดเป็นอย่างน้อย',
        'Portfolio; UX Case Study หรือ UI Case Study (ไฟล์ PDF ขนาดไม่เกิน 50 MB)'
      ]
    case 'marketing':
      return [
        'จงบอก จุดแข็ง (อย่างน้อย 2 ข้อ) และ จุดอ่อน (อย่างน้อย 2 ข้อ) ของสื่อประเภทเว็บไซต์ สำหรับตัวเรา แบรนด์ และธุรกิจ เมื่อเทียบกับสื่อดิจิทัล ประเภทอื่นๆ เช่น โมบายแอพพลิเคชั่นและโซเชียลมีเดีย เป็นต้น',
        'คุณคิดว่าการทำ Marketing กับ Content เหมือนหรือต่างกันอย่างไร และอะไรคือเรื่องที่สำคัญที่สุดของการทำการตลาด'
      ]
    case 'programming':
      return [
        'ให้น้องเล่าประสบการณ์การทำงานเกี่ยวกับการทำหรือพัฒนาเว็บไซต์ (สามารถแปะลิงค์ผลงานที่เคยทำไว้ได้)',
        'ให้น้องเลือก Technology, Library หรือแนวคิดใหม่ๆ ในการทำเว็บมาหนึ่งอย่างพร้อมกับอธิบายว่าคืออะไร และทำไมถึงตัดสินใจเลือกอันนี้',
        'ให้ออกแบบระบบจองห้องประชุมของห้องสมุดมหาวิทยาลัย โดยให้ระบุ Feature ที่อยากให้มี, เทคโนโลยีที่จะเลือกใช้, โครงสร้างของฐานข้อมูล และ wireframe ของหน้าจอแบบคร่าว ๆ',
        'จงเขียน function cardAt ที่รับค่า n และคืนค่าเป็นเลขของไพ่ในสำรับลำดับที่ n โดยเรียงตามดอกไพ่ (C, D, H, S) และเลขไพ่ (2, 3, 4, 5, 6, 7, 8, 9, 0, J, Q, K, A) ตามลำดับ ตัวอย่างเช่น cardAt(0) = 2C, cardAt(1) = 3C, cardAt(34) = 0H และ cardAt(35) = JH เป็นต้น โดยเขียนคำตอบมาโดยใช้ภาษาใดก็ได้ หรือเป็น pseudocode ก็ได้เช่นกัน'
      ]
    default:
      return []
  }
}
