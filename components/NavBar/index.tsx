import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Image from 'next/image';
import IconFire from '../../public/fire-icon.png';
interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = ['Estados', 'Biomas', 'Municipios'];

export default function DrawerAppBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Offset opcional para não cobrir o topo da seção com a AppBar fixa
      const offset = 64; 
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      globalThis.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };
  const drawer = (
    <Box 
      onClick={handleDrawerToggle} 
      sx={{ 
        textAlign: 'center', 
        bgcolor: '#090a0f', 
        height: '100%',
        color: '#cbd5e1', 
      }}
    >
      <Typography variant="h6" sx={{ my: 3, display: 'flex', justifyContent: 'center' }}>
        <Image src={IconFire} alt="Fire Icon" width={38} height={38} className="animate-pulse" />
      </Typography>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton 
              onClick={() => scrollToSection(item)}
              sx={{ 
                textAlign: 'center',
                py: 2,
                '&:hover': {
                  bgcolor: 'rgba(249, 115, 22, 0.08)', 
                  color: '#f97316', 
                },
                transition: 'all 0.2s ease-in-out'
              }}
            >
              <ListItemText 
                primary={item} 
                primaryTypographyProps={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em'
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      {/* <CssBaseline /> */}
      <AppBar 
        component="nav" 
        elevation={0} 
        sx={{
          backgroundColor: 'rgba(9, 10, 15, 0.65)', 
          backdropFilter: 'blur(12px)', 
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)', 
          boxShadow: 'none',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: { sm: '70px' } }}>
          
          {/* ÍCONE MENU MOBILE */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' }, color: '#f8fafc' }}
          >
            <MenuIcon />
          </IconButton>
          
          {/* LOGO (DESKTOP) */}
          <Typography
            variant="h6"
            component="div"
            sx={{ 
              flexGrow: 1, 
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center',
            }}
          >
            <div className="hover:opacity-80 transition-opacity cursor-pointer">
              <Image src={IconFire} alt="Fire Icon" width={35} height={35} />
            </div>
          </Typography>

          {/* LINKS DE NAVEGAÇÃO (DESKTOP) */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
            {navItems.map((item) => (
              <Button 
                key={item} 
                onClick={() => scrollToSection(item)}
                sx={{ 
                  color: '#94a3b8', 
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  letterSpacing: '0.07em',
                  textTransform: 'uppercase',
                  px: 2,
                  py: 1,
                  borderRadius: '8px',
                  transition: 'all 0.2s',
                  '&:hover': {
                    color: '#ffffff', 
                    backgroundColor: 'rgba(255, 255, 255, 0.03)', 
                  }
                }}
              >
                {item}
              </Button>
            ))}
          </Box>
          
        </Toolbar>
      </AppBar>

      {/* MENU LATERAL MOBILE */}
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              borderRight: '1px solid rgba(255, 255, 255, 0.05)',
              boxShadow: '10px 0 30px rgba(0,0,0,0.5)'
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      
      {/* ESPAÇADOR DA TOOLBAR */}
      <Box component="main" sx={{ p: 0 }}>
        <Toolbar sx={{ minHeight: { sm: '70px' } }} />
      </Box>
    </Box>
  );
}