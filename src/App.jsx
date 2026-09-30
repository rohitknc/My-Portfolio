import React from 'react';
import {
  AppBar, Avatar, Box, Button, Chip, Container, CssBaseline, Divider,
  Grid, IconButton, Paper, Stack, Toolbar, Tooltip, Typography
} from '@mui/material';
import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded';
import AutoAwesomeRounded from '@mui/icons-material/AutoAwesomeRounded';
import CloudRounded from '@mui/icons-material/CloudRounded';
import CodeRounded from '@mui/icons-material/CodeRounded';
import EmailRounded from '@mui/icons-material/EmailRounded';
import GitHub from '@mui/icons-material/GitHub';
import LinkedIn from '@mui/icons-material/LinkedIn';
import StorageRounded from '@mui/icons-material/StorageRounded';
import TerminalRounded from '@mui/icons-material/TerminalRounded';
import WorkRounded from '@mui/icons-material/WorkRounded';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1565C0', dark: '#0D47A1', light: '#42A5F5', contrastText: '#fff' },
    secondary: { main: '#00897B' },
    background: { default: '#F7F9FC', paper: '#FFFFFF' },
    text: { primary: '#172033', secondary: '#5F6B7A' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", Arial, sans-serif',
    h1: { fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif', fontWeight: 800, letterSpacing: '-.045em' },
    h2: { fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif', fontWeight: 750, letterSpacing: '-.035em' },
    h3: { fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif', fontWeight: 700 },
    button: { textTransform: 'none', fontWeight: 700 },
  },
  shape: { borderRadius: 14 },
  components: {
    MuiButton: { defaultProps: { disableElevation: true } },
    MuiCard: { styleOverrides: { root: { border: '1px solid #E5EAF1' } } },
  },
});

const projects = [
  { title:'US Federal Document Generation', subtitle:'Dynamics 365 · Custom API · Automation', icon:<StorageRounded/>, text:'Built a C# Custom API that assembles multi-level Dataverse data, triggers Power Automate and maps the result into Word templates for automated document generation.', tags:['C#','Dataverse','FetchXML','Power Automate'] },
  { title:'Employee Management System', subtitle:'Canvas App · Security · SharePoint', icon:<WorkRounded/>, text:'Responsive employee management solution with role-based access, Azure AD identity, SharePoint synchronization, pagination and PDF export.', tags:['Power Apps','Dataverse','SharePoint','Azure AD'] },
  { title:'HubSpot → Dynamics 365 Migration', subtitle:'CRM · Data · ALM', icon:<CloudRounded/>, text:'Migrated CRM data and business processes into Dataverse with custom tables, BPF automation, JavaScript validation, dashboards, security roles and ALM.', tags:['Dynamics 365','Dataverse','BPF','JavaScript'] },
  { title:'Claude AI + Dataverse via MCP', subtitle:'AI · MCP · Node.js', icon:<AutoAwesomeRounded/>, text:'Connected Claude to Dataverse using MCP so natural-language requests can retrieve, filter and interpret CRM records without manually building queries.', tags:['Claude AI','MCP','TypeScript','Node.js'] },
];

const skills = [
  ['Microsoft Platform','Power Apps · Power Automate · Dataverse · Dynamics 365 · BPF · Copilot Studio'],
  ['Pro-code','C# · JavaScript · TypeScript · Python · SQL · FetchXML · React · Node.js'],
  ['Cloud & Integration','Dataverse Web API · XRM SDK · Azure Functions · Logic Apps · SharePoint · Azure AD'],
  ['Engineering & ALM','Solutions · Environment Variables · Connection References · XrmToolBox · Postman · Git'],
  ['Data & Reporting','SQL Server · Dataverse TDS · Power BI · SSRS · Views · Charts · Dashboards'],
  ['AI','Claude AI · MCP · Copilot Studio · AI Builder · Natural-language CRM workflows'],
];

function SectionTitle({eyebrow, title, text}) {
  return (
    <Stack spacing={1.5} sx={{mb:5}}>
      <Typography sx={{color:'primary.main',fontSize:12,fontWeight:800,letterSpacing:1.4,textTransform:'uppercase'}}>{eyebrow}</Typography>
      <Typography variant="h2" sx={{fontSize:{xs:34,md:48},maxWidth:760}}>{title}</Typography>
      {text && <Typography color="text.secondary" sx={{maxWidth:650,lineHeight:1.8,fontSize:16}}>{text}</Typography>}
    </Stack>
  );
}

function ProjectCard({project}) {
  return (
    <Paper elevation={0} sx={{height:'100%',p:{xs:2.5,md:3.2},borderRadius:3,display:'flex',flexDirection:'column',gap:2.5,transition:'all .25s ease','&:hover':{transform:'translateY(-5px)',boxShadow:'0 18px 45px rgba(31,55,86,.10)',borderColor:'#B8D2EF'}}}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Avatar sx={{bgcolor:'#EAF3FF',color:'primary.main',width:46,height:46}}>{project.icon}</Avatar>
        <Chip label="CASE STUDY" size="small" sx={{fontSize:10,fontWeight:800,bgcolor:'#F2F6FA',color:'#6B7787'}} />
      </Stack>
      <Box>
        <Typography sx={{color:'primary.main',fontSize:12,fontWeight:700,mb:1}}>{project.subtitle}</Typography>
        <Typography variant="h3" sx={{fontSize:23,mb:1.5}}>{project.title}</Typography>
        <Typography color="text.secondary" sx={{lineHeight:1.75,fontSize:14.5}}>{project.text}</Typography>
      </Box>
      <Box sx={{mt:'auto'}}>
        <Divider sx={{mb:2}} />
        <Stack direction="row" spacing={.7} useFlexGap flexWrap="wrap">
          {project.tags.map(tag=><Chip key={tag} label={tag} variant="outlined" size="small" sx={{fontSize:11,borderColor:'#D9E2EC'}} />)}
        </Stack>
      </Box>
    </Paper>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{bgcolor:'background.default',minHeight:'100vh',color:'text.primary'}}>
        <AppBar position="sticky" elevation={0} color="inherit" sx={{borderBottom:'1px solid #E5EAF1',backdropFilter:'blur(12px)',backgroundColor:'rgba(255,255,255,.90)'}}>
          <Toolbar sx={{minHeight:{xs:68,md:76},width:'100%',maxWidth:1200,mx:'auto'}}>
            <Stack direction="row" alignItems="center" spacing={1.5} sx={{flex:1}}>
              <Avatar sx={{bgcolor:'primary.main',fontWeight:800,width:40,height:40}}>K</Avatar>
              <Box>
                <Typography fontWeight={800} fontSize={15}>KNC</Typography>
                <Typography variant="caption" color="text.secondary">Dynamics 365 · Power Platform</Typography>
              </Box>
            </Stack>
            <Stack direction="row" spacing={3} sx={{display:{xs:'none',md:'flex'},mr:3}}>
              {['Work','Experience','Skills','Contact'].map(item=><Button key={item} color="inherit" href={'#'+item.toLowerCase()} sx={{fontSize:13}}>{item}</Button>)}
            </Stack>
            <Button variant="contained" startIcon={<EmailRounded/>} href="mailto:kanjarlanarasimha@gmail.com" sx={{borderRadius:2,display:{xs:'none',sm:'inline-flex'}}}>Let's talk</Button>
            <Tooltip title="Email me"><IconButton href="mailto:kanjarlanarasimha@gmail.com" sx={{display:{xs:'inline-flex',sm:'none'},color:'primary.main'}}><EmailRounded/></IconButton></Tooltip>
          </Toolbar>
        </AppBar>

        <Box sx={{background:'linear-gradient(135deg,#F7FAFF 0%,#EEF5FF 52%,#F9FBFD 100%)',borderBottom:'1px solid #E1EAF4'}}>
          <Container maxWidth="lg" sx={{py:{xs:7,md:11}}}>
            <Grid container spacing={{xs:5,md:8}} alignItems="center">
              <Grid size={{xs:12,md:7}}>
                <Chip icon={<span className="status-dot" />} label="Open to opportunities" sx={{mb:2.5,bgcolor:'#E8F5EE',color:'#16724A',fontWeight:800}} />
                <Typography variant="h1" sx={{fontSize:{xs:45,sm:60,md:76},lineHeight:1.02,maxWidth:780}}>
                  Building <Box component="span" sx={{color:'primary.main'}}>business systems</Box> that work.
                </Typography>
                <Typography sx={{mt:2.5,fontSize:{xs:17,md:19},color:'text.secondary',maxWidth:690,lineHeight:1.8}}>
                  Dynamics 365 & Power Platform Developer building CRM applications, automation, integrations and AI-enabled business workflows.
                </Typography>
                <Stack direction={{xs:'column',sm:'row'}} spacing={1.5} sx={{mt:4}}>
                  <Button variant="contained" size="large" endIcon={<ArrowForwardRounded/>} href="#work" sx={{px:2.5,borderRadius:2}}>View selected work</Button>
                  <Button variant="outlined" size="large" startIcon={<EmailRounded/>} href="mailto:kanjarlanarasimha@gmail.com" sx={{px:2.5,borderRadius:2,bgcolor:'white'}}>Contact me</Button>
                </Stack>
                <Stack direction="row" spacing={{xs:3,md:5}} sx={{mt:5,pt:3,borderTop:'1px solid #DCE6F0'}}>
                  {[['2+','years building with Dynamics'],['4','production systems'],['8.5','B.Tech CGPA']].map(([value,label])=><Box key={label}><Typography variant="h3" sx={{fontSize:25,color:'primary.dark'}}>{value}</Typography><Typography variant="caption" color="text.secondary">{label}</Typography></Box>)}
                </Stack>
              </Grid>
              <Grid size={{xs:12,md:5}}>
                <Paper elevation={0} sx={{p:1.2,borderRadius:4,bgcolor:'white',boxShadow:'0 28px 70px rgba(26,71,112,.14)',transform:{md:'rotate(1.5deg)'}}}>
                  <Box sx={{position:'relative',borderRadius:3,overflow:'hidden',aspectRatio:'4/4.8',bgcolor:'#DDE8F2'}}>
                    <Box component="img" src="/profile.png" alt="Kanjarla Narasimha Charyulu" sx={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center top'}} />
                    <Box sx={{position:'absolute',left:18,right:18,bottom:18,p:2,borderRadius:2.5,bgcolor:'rgba(9,35,62,.88)',color:'white',backdropFilter:'blur(10px)'}}>
                      <Typography fontWeight={800}>Kanjarla Narasimha Charyulu</Typography>
                      <Typography variant="caption" sx={{opacity:.8}}>Dynamics 365 · Power Platform · AI</Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>

        <Box sx={{bgcolor:'#0B1F33',color:'white',py:1.6,overflow:'hidden'}}>
          <Container maxWidth="lg">
            <Stack direction="row" spacing={3} useFlexGap flexWrap="wrap" justifyContent={{xs:'center',md:'space-between'}}>
              {['Power Apps','Power Automate','Dataverse','Dynamics 365','Azure','C#','JavaScript','React'].map(x=><Typography key={x} variant="caption" sx={{opacity:.78,fontWeight:700,letterSpacing:.4}}>{x}</Typography>)}
            </Stack>
          </Container>
        </Box>

        <Container id="work" maxWidth="lg" sx={{py:{xs:8,md:12}}}>
          <SectionTitle eyebrow="Selected work" title="Solutions built around real business workflows." text="A focused selection across CRM, automation, migration and AI integration." />
          <Grid container spacing={2}>
            {projects.map(p=><Grid key={p.title} size={{xs:12,md:6}}><ProjectCard project={p}/></Grid>)}
          </Grid>
        </Container>

        <Box sx={{bgcolor:'#0F2942',color:'white'}}>
          <Container maxWidth="lg" sx={{py:{xs:8,md:11}}}>
            <SectionTitle eyebrow="How I work" title="Engineering with business context." text="I prefer useful software over unnecessary complexity — keeping the workflow, data and long-term maintainability at the center." />
            <Grid container spacing={2}>
              {[
                ['01','Understand first','Map the users, workflow and data before selecting platform features or writing code.'],
                ['02','Choose the right layer','Use low-code where it stays maintainable, and bring in C#, APIs or Azure when complexity needs it.'],
                ['03','Ship for production','Security, ALM, environments and integrations are part of the architecture from day one.'],
              ].map(([n,t,d])=><Grid size={{xs:12,md:4}} key={n}><Paper elevation={0} sx={{height:'100%',p:3,bgcolor:'rgba(255,255,255,.06)',color:'white',border:'1px solid rgba(255,255,255,.12)',borderRadius:3}}><Typography sx={{color:'#69A7E8',fontWeight:800}}>{n}</Typography><Typography variant="h3" sx={{fontSize:21,mt:4,mb:1.2}}>{t}</Typography><Typography sx={{color:'#B7C6D6',fontSize:14,lineHeight:1.75}}>{d}</Typography></Paper></Grid>)}
            </Grid>
          </Container>
        </Box>

        <Container id="experience" maxWidth="lg" sx={{py:{xs:8,md:12}}}>
          <SectionTitle eyebrow="Experience" title="Growing through hands-on delivery." />
          <Stack divider={<Divider/>} spacing={0}>
            <Box sx={{py:4,display:'grid',gridTemplateColumns:{xs:'1fr',md:'170px 1fr'},gap:3}}>
              <Typography variant="caption" color="text.secondary">2025 — PRESENT</Typography>
              <Box><Typography variant="caption" color="primary.main" fontWeight={800}>PiSquare Technologies · Hyderabad</Typography><Typography variant="h3" sx={{fontSize:25,my:1}}>Dynamics 365 / Power Platform Developer</Typography><Typography color="text.secondary" sx={{lineHeight:1.8,maxWidth:760}}>Building Model-Driven and Canvas Apps on Dataverse, Power Automate flows, JavaScript and C# plugins, Custom APIs, document automation, reporting and AI-enabled business features with ALM across environments.</Typography></Box>
            </Box>
            <Box sx={{py:4,display:'grid',gridTemplateColumns:{xs:'1fr',md:'170px 1fr'},gap:3}}>
              <Typography variant="caption" color="text.secondary">2024 — 2025</Typography>
              <Box><Typography variant="caption" color="primary.main" fontWeight={800}>PiSquare Technologies · Hyderabad</Typography><Typography variant="h3" sx={{fontSize:25,my:1}}>Software Developer Intern</Typography><Typography color="text.secondary" sx={{lineHeight:1.8,maxWidth:760}}>Worked across entities, forms, views and business rules in Dynamics 365 and Power Apps, alongside TypeScript, JavaScript, PCF and React with Fluent UI in an Agile sprint cycle.</Typography></Box>
            </Box>
          </Stack>
        </Container>

        <Box id="skills" sx={{bgcolor:'#F0F4F8',borderTop:'1px solid #E0E7EF',borderBottom:'1px solid #E0E7EF'}}>
          <Container maxWidth="lg" sx={{py:{xs:8,md:11}}}>
            <SectionTitle eyebrow="Capabilities" title="A connected technical stack." />
            <Grid container spacing={2}>
              {skills.map(([title,text],i)=><Grid key={title} size={{xs:12,sm:6,md:4}}><Paper elevation={0} sx={{p:2.7,height:'100%',borderRadius:3,bgcolor:'white'}}><Avatar sx={{bgcolor:'#EAF3FF',color:'primary.main',mb:2}}>{i<3?<CodeRounded/>:<TerminalRounded/>}</Avatar><Typography variant="h3" sx={{fontSize:18,mb:1}}>{title}</Typography><Typography color="text.secondary" sx={{fontSize:13.5,lineHeight:1.75}}>{text}</Typography></Paper></Grid>)}
            </Grid>
          </Container>
        </Box>

        <Container maxWidth="lg" sx={{py:{xs:8,md:10}}}>
          <Grid container spacing={4} alignItems="center">
            <Grid size={{xs:12,md:5}}><Typography sx={{color:'primary.main',fontWeight:800,fontSize:12,letterSpacing:1.3}}>EDUCATION</Typography><Typography variant="h2" sx={{fontSize:42,mt:1}}>Computer Science foundation.</Typography></Grid>
            <Grid size={{xs:12,md:7}}><Paper elevation={0} sx={{p:3.5,borderRadius:3,bgcolor:'white'}}><Typography variant="caption" color="text.secondary">2020 — 2024</Typography><Typography variant="h3" sx={{fontSize:24,mt:1}}>B.Tech, Computer Science & Engineering</Typography><Typography color="text.secondary" sx={{mt:.6}}>Narasaraopeta Engineering College</Typography><Typography variant="h2" sx={{color:'primary.main',mt:2}}>8.5 <Box component="span" sx={{fontSize:13,color:'text.secondary'}}>CGPA</Box></Typography></Paper></Grid>
          </Grid>
        </Container>

        <Box id="contact" sx={{bgcolor:'#E8F1FA',borderTop:'1px solid #D7E4F0'}}>
          <Container maxWidth="lg" sx={{py:{xs:8,md:11}}}>
            <Grid container spacing={5} alignItems="center">
              <Grid size={{xs:12,md:7}}><Typography sx={{color:'primary.main',fontWeight:800,fontSize:12,letterSpacing:1.3}}>LET'S CONNECT</Typography><Typography variant="h2" sx={{fontSize:{xs:38,md:54},mt:1}}>Have a role that needs someone who can build?</Typography><Typography color="text.secondary" sx={{mt:2,lineHeight:1.8,maxWidth:620}}>Open to opportunities across Dynamics 365, Power Platform, Azure, backend integrations and AI-enabled business applications.</Typography></Grid>
              <Grid size={{xs:12,md:5}}><Paper elevation={0} sx={{p:3,borderRadius:3}}><Typography variant="caption" color="text.secondary">CONTACT</Typography><Typography sx={{fontWeight:800,fontSize:{xs:17,md:20},mt:1,wordBreak:'break-word'}}>kanjarlanarasimha@gmail.com</Typography><Stack direction="row" spacing={1} sx={{mt:2}}><Button variant="contained" startIcon={<EmailRounded/>} href="mailto:kanjarlanarasimha@gmail.com">Email me</Button><Tooltip title="GitHub"><IconButton href="https://github.com/rohitknc" target="_blank"><GitHub/></IconButton></Tooltip><Tooltip title="LinkedIn"><IconButton href="https://www.linkedin.com/" target="_blank"><LinkedIn/></IconButton></Tooltip></Stack></Paper></Grid>
            </Grid>
          </Container>
        </Box>

        <Box component="footer" sx={{py:3,bgcolor:'#071A2A',color:'#9FB2C4'}}>
          <Container maxWidth="lg"><Stack direction={{xs:'column',sm:'row'}} justifyContent="space-between" spacing={1}><Typography variant="caption">© 2026 Kanjarla Narasimha Charyulu</Typography><Typography variant="caption">Dynamics 365 · Power Platform · Engineering</Typography></Stack></Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
