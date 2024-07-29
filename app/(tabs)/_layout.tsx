import {Tabs} from 'expo-router';
import React from 'react';

import {TabBarIcon} from '@/components/navigation/TabBarIcon';
import {Colors} from '@/constants/Colors';
import {useColorScheme} from '@/hooks/useColorScheme';
import {GestureHandlerRootView} from "react-native-gesture-handler";

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                    headerShown: false,
                }}>
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Recent Expenses',
                        tabBarIcon: ({color, focused}) => (
                            <TabBarIcon name={focused ? 'hourglass' : 'hourglass-outline'} color={color}/>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="AllExpenses"
                    options={{
                        title: 'All expenses',
                        tabBarIcon: ({color, focused}) => (
                            <TabBarIcon name={focused ? 'calendar' : 'calendar-outline'} color={color}/>
                        ),
                    }}
                />
            </Tabs>
        </GestureHandlerRootView>
    );
}
