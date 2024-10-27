import { FlatList, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useWeather } from '@/hoocks/useWeather';
import { intlFormatDistance } from 'date-fns'
import { pl } from 'date-fns/locale'

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    dayText: {
        fontSize: 18,
        color: '#fff',
        width: 90,
    },
    tempText: {
        fontSize: 18,
        color: '#fff'
    }
});

// @ts-ignore
const dateToRelative = (date: Date) => intlFormatDistance(date, new Date(), { unit: 'day', locale: pl })

export default function Forecast() {
    const { weather, errorMsg } = useWeather(10);

    if(errorMsg) {
        return <View style={styles.container}><Text>{errorMsg}</Text></View>;
    }

    if (!weather) {
        return <View style={styles.container}><Text>Loading...</Text></View>;
    }
    console.log(weather)
    return (
        <View style={styles.container}>
            <FlatList
                data={weather}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={[styles.row, {backgroundColor: item.weatherColor }]}>
                        <Text style={styles.dayText}>{dateToRelative(item.time)}</Text>
                        <MaterialCommunityIcons
                            size={32}
                            name={item.weatherIcon}
                            color={'#fff'}
                        />
                        <Text style={styles.tempText}>{item.temperature}˚</Text>
                    </View>
                )}
            />
        </View>
    );
}
