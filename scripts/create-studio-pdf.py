"""Build the fictional two-page sample used by /resume-studio. Requires ReportLab.
Run with the Codex bundled Python runtime or any Python with reportlab installed.
All identities, work experience, and contact details in this PDF are illustrative.
"""
from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, Color, white
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import ImageReader
import shutil
ROOT=Path(__file__).resolve().parents[1]
DEST=ROOT/'public/resume-studio/alex-morgan-resume.pdf'
PORTRAIT=ROOT/'public/resume-studio/sample-portrait.png'
if not PORTRAIT.exists(): raise FileNotFoundError('Generate and save the fictional sample portrait first.')
FONT=Path('/System/Library/Fonts/Supplemental')
for name,file in [('Studio','Arial.ttf'),('StudioBold','Arial Bold.ttf'),('StudioItalic','Arial Italic.ttf')]:
 pdfmetrics.registerFont(TTFont(name,str(FONT/file)))
W,H=A4
INK=HexColor('#303737');MUTED=HexColor('#555e5f');CYAN=HexColor('#acd2db');RULE=HexColor('#9caeb0')
c=canvas.Canvas(str(DEST),pagesize=A4,pageCompression=1)
c.setTitle('Alex Morgan - Sample Resume and Cover Letter')
c.setAuthor('Resume Studio - Fictional sample')
c.setSubject('Fictional sample layout for an interactive React PDF viewer')
def rect(x,top,w,h,color):
 c.setFillColor(color);c.rect(x,H-top-h,w,h,fill=1,stroke=0)
def text(x,top,copy,size=9,font='Studio',color=INK,tracking=0):
 c.saveState();t=c.beginText(x,H-top);t.setFont(font,size);t.setFillColor(color);t.setCharSpace(tracking);t.textLine(copy);c.drawText(t);c.restoreState()
def line(x,top,w,color=RULE,weight=.5):
 c.setStrokeColor(color);c.setLineWidth(weight);c.line(x,H-top,x+w,H-top)
def para(x,top,copy,width,size=8.1,leading=12,color=MUTED):
 p=Paragraph(copy,ParagraphStyle('copy',fontName='Studio',fontSize=size,leading=leading,textColor=color));_,h=p.wrap(width,H);p.drawOn(c,x,H-top-h);return h
def heading(x,top,copy):
 text(x,top,copy,10,'StudioBold',tracking=1.6);line(x,top+9,29,INK,.65)
def brand():
 rect(62,0,77,110,CYAN)
 c.setStrokeColor(HexColor('#6d9098'));c.setLineWidth(.5)
 c.line(82,H-40,120,H-78);c.line(82,H-78,120,H-40)
 text(74,65,'A',17,'StudioBold');text(114,65,'M',17,'StudioBold')
 c.setFillColor(INK);c.circle(101,H-59,1.7,fill=1,stroke=0)
 text(191,61,'ALEX MORGAN',24,'StudioBold',tracking=1)
 text(193,85,'Web & Graphic Designer',11.8,tracking=.75);line(193,98,55,INK,.7)
brand()
rect(0,125,W,121,HexColor('#e5e9e9'))
c.saveState();path=c.beginPath();path.circle(82,H-186,48);c.clipPath(path,stroke=0,fill=0);c.drawImage(ImageReader(str(PORTRAIT)),34,H-234,96,96,mask='auto',preserveAspectRatio=False);c.restoreState()
c.setStrokeColor(RULE);c.setLineWidth(.55);c.line(161,H-158,161,H-217)
para(191,154,'Hello. I am Alex Morgan, a web and graphic designer with a focus on clear, considered digital experiences. I bring thoughtful typography, purposeful layouts and a collaborative approach to every project. From a first sketch to a finished interface, I enjoy turning complex ideas into work that feels simple, useful and distinctly human.',371,8.1,12.2)
rect(0,260,193,H-260,CYAN)
heading(32,286,'CONTACT')
for y,icon,copy in [(327,'T','+44 (0)20 0000 0000'),(348,'@','alex@example.com'),(369,'W','alexmorgan.example'),(390,'L','London, United Kingdom')]:
 text(33,y,icon,7.5,'StudioBold');text(51,y,copy,8.7)
heading(32,445,'EXPERTISE')
skills=[('Photoshop',.84),('Illustrator',.78),('JavaScript',.73),('Figma',.9),('After Effects',.69),('InDesign',.81),('Creativity',.9),('Teamwork',.85),('Communication',.88)]
for i,(label,value) in enumerate(skills):
 y=483+i*19+(12 if i>=6 else 0)
 text(32,y,'•',7.5);text(43,y,label,8.4);rect(109,y-5,65,2.6,HexColor('#d7e8eb'));rect(109,y-5,65*value,2.6,HexColor('#526a70'))
heading(32,701,'LANGUAGES')
for i,(lang,level) in enumerate([('English','Native'),('French','Advanced'),('Spanish','Conversational')]):
 y=737+i*23;text(32,y,'•',7);text(43,y,lang,8);text(114,y,level,7.2);line(32,y+7,137,HexColor('#7da6ae'),.35)
heading(221,286,'EXPERIENCE')
roles=[(327,'SENIOR WEB DESIGNER','Green Software Company / 2022 - Present','London','Lead visual design for accessible websites and digital products, from research and early concepts through responsive delivery. Partner with engineers and stakeholders to create reusable design systems, improve content hierarchy and make complex user journeys feel straightforward.'),(458,'GRAPHIC DESIGNER','Softca Studio / 2019 - 2022','New York','Created distinctive identities and editorial assets for independent brands. Built cohesive visual systems across print, web and social, balancing expressive typography with consistent, practical execution. Collaborated closely with clients to turn early ideas into polished creative work.'),(590,'JUNIOR WEB DEVELOPER','Red International Studio / 2017 - 2019','London','Developed responsive web interfaces with an eye for typography, accessibility and detail. Worked alongside senior designers to translate layouts into maintainable components, refine interactions and deliver thoughtful experiences across screen sizes.')]
for y,title,company,city,copy in roles:
 text(221,y,title,9,'StudioBold',tracking=.5);text(221,y+18,company,8.5,'StudioItalic',tracking=.25);c.setFont('Studio',8.5);c.setFillColor(INK);c.drawRightString(W-32,H-y-18,city);line(221,y+26,W-253);para(221,y+34,copy,W-253,8.1,12)
heading(221,721,'REFERENCES')
for x,name,role,mail in [(221,'DAVID JOHNSON','Senior Web Designer','david@example.com'),(421,'DUSTIN PAUL','Creative Director','dustin@example.com')]:
 text(x,759,name,8.8,'StudioBold',tracking=.45);text(x,775,role,8.4);text(x,790,'T: +44 (0)20 0000 0000',7.7);text(x,803,mail,7.7)
text(221,831,'SAMPLE LAYOUT - ALL PROFILE DETAILS ARE FICTIONAL',5.4,color=HexColor('#899596'),tracking=.6)
c.showPage();brand()
rect(0,145,17,H-145,CYAN)
text(62,176,'A NOTE OF INTRODUCTION',10,'StudioBold',tracking=1.7)
line(62,193,W-124)
text(62,230,'Dear Hiring Team,',11,'StudioBold')
letter=["Good design should make the complicated feel effortless. I am writing to introduce myself as a web and graphic designer who enjoys bringing clarity, personality and care to digital products.","My work sits at the intersection of visual design and implementation. I take ideas from a sketchbook into structured design systems and responsive interfaces, with thoughtful typography and accessibility considered throughout the process.","In my recent roles I have collaborated with engineers, creative teams and stakeholders to build useful, cohesive experiences. I value honest feedback, clear communication and the small details that make a finished product feel considered.","I would welcome the opportunity to learn about your team, the problems you are solving and how my experience could contribute. Thank you for your time and consideration."]
y=258
for paragraph in letter: y+=para(62,y,paragraph,W-124,11,18)+24
text(62,y+7,'Warm regards,',11)
text(62,y+51,'Alex Morgan',25,'StudioItalic')
text(62,y+75,'WEB & GRAPHIC DESIGNER',8,tracking=1.5)
line(62,754,W-124)
text(62,780,'alex@example.com',9);text(62,797,'London, United Kingdom',9)
text(62,826,'SAMPLE COVER LETTER - ALL PROFILE DETAILS ARE FICTIONAL',6,color=HexColor('#899596'),tracking=.6)
c.save()
(ROOT/'output/pdf').mkdir(parents=True,exist_ok=True)
shutil.copyfile(DEST,ROOT/'output/pdf/alex-morgan-resume.pdf')
print(DEST)
