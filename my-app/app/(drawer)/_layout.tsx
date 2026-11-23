import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';

export default function DrawerLayout() {
  return (
    <Drawer screenOptions={{ headerTitle: '',
    headerShadowVisible: false,
    drawerActiveTintColor: '#000000',
    drawerActiveBackgroundColor: 'rgba(0, 0, 0, 0.08)',
    drawerInactiveTintColor: '#555555',
    }}>
      <Drawer.Screen name="index" 
      options={{  
        drawerLabel: 'Home',
        drawerIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={size}
              color={'black'}
            />
          ),
      }} />
      
      
      
      
      
      <Drawer.Screen
        name="contact"
        options={{
          drawerLabel: 'Contact',
          drawerIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'call'  : 'call-outline'}
              size={size}
              color={'black'}
            />
          ),
        }}
      />
    </Drawer>
  );
}
