import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useWeather } from '@/hoocks/useWeather';


const styles = StyleSheet.create({
    weatherContainer: {
        flex: 1
    },
    headerContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    tempText: {
        fontSize: 72,
        color: '#fff'
    },
    bodyContainer: {
        flex: 2,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        paddingLeft: 25,
        marginBottom: 40
    },
    title: {
        fontSize: 60,
        color: '#fff'
    },
    subtitle: {
        fontSize: 24,
        color: '#fff'
    }
});


export default function Index() {
    const {weather, errorMsg} = useWeather();
    const [today] = weather || [];

    if(errorMsg) {
        return <View style={styles.weatherContainer} >
            <Text style={styles.tempText}>{errorMsg}</Text>
        </View>;
    }

    if (!today) {
        //loading
        return <View style={styles.weatherContainer} >
            <Text style={styles.tempText}>Loading...</Text>
        </View>;
    }

    return (
        <View
            style={[
                styles.weatherContainer,
                { backgroundColor: today.weatherColor }
            ]}
        >
            <View style={styles.headerContainer}>
                <MaterialCommunityIcons
                    size={72}
                    name={today.weatherIcon}
                    color={'#fff'}
                />
                <Text style={styles.tempText}>{today.temperature}˚</Text>
            </View>
            <View style={styles.bodyContainer}>
                <Text style={styles.title}>{today.weatherName}</Text>
                <Text style={styles.subtitle}>
                    {today.weatherQuote}
                </Text>
            </View>
        </View>
    );
}
