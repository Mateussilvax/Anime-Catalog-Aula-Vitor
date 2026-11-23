import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';

const drawerFooterImg = require('../../assets/nami_navigator.jpg');

function CustomDrawerContent({ state, descriptors, navigation }: any) {
  return (
    <SafeAreaView style={styles.drawerContainer} edges={['top', 'bottom']}>
      {/* Lista de itens do menu (Home e Contact) */}
      <ScrollView contentContainerStyle={styles.menuList}>
        {state.routes.map((route: any, index: number) => {
          const isFocused = state.index === index;
          const { options } = descriptors[route.key];
          const label = options.drawerLabel ?? options.title ?? route.name;
          const color = isFocused ? '#000000' : '#555555';

          return (
            <TouchableOpacity
              key={route.key}
              activeOpacity={0.7}
              style={[styles.menuItem, isFocused && styles.menuItemActive]}
              onPress={() => {
                navigation.navigate(route.name);
                navigation.closeDrawer();
              }}
            >
              {options.drawerIcon &&
                options.drawerIcon({
                  color,
                  size: 22,
                  focused: isFocused,
                })}
              <Text
                style={[
                  styles.menuLabel,
                  { color },
                  isFocused && styles.menuLabelActive,
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Rodapé com a frase e a Nami */}
      <View style={styles.footer}>
        <View style={styles.quoteBox}>
          <Text style={styles.footerText}>
            Como estamos brincando com navigators, não poderia faltar a
            navegadora dos Mugiwara!
          </Text>
        </View>

        <Image
          source={drawerFooterImg}
          style={styles.footerImage}
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  );
}

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerTitle: '',
        headerShadowVisible: false,
        drawerActiveTintColor: '#000000',
        drawerActiveBackgroundColor: 'rgba(0, 0, 0, 0.08)',
        drawerInactiveTintColor: '#555555',
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: 'Home',
          drawerIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={size}
              color={color as string}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="contact"
        options={{
          drawerLabel: 'Contact',
          drawerIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'call' : 'call-outline'}
              size={size}
              color={color as string}
            />
          ),
        }}
      />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  menuList: {
    paddingTop: 12,
    paddingHorizontal: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 24,
    marginBottom: 4,
  },
  menuItemActive: {
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
  },
  menuLabel: {
    fontSize: 15,
    fontWeight: '500',
  },
  menuLabelActive: {
    fontWeight: '700',
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 0,
  },
  quoteBox: {
    backgroundColor: 'rgba(205, 212, 220, 0.9)',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 8,
  },
  footerText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    lineHeight: 17,
  },
  footerImage: {
    width: 165,
    height: 165,
  },
});