import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';


export default function TabLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }} >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Dziś',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                    headerShown: false
                }}
            />
            <Tabs.Screen
                name="forecast"
                options={{
                    title: '10 dni',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
                    headerShown: false
                }}
            />
        </Tabs>
    );
}
