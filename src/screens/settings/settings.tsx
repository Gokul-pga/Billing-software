import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View } from 'react-native';

export type SettingsProps = {

}

const SettingsScreen = (props: SettingsProps) => {
    const [toggleVisible, setToggleVisible] = useState(false);
    const navigation = useNavigation();


    return (
        <View>

        </View>
    )
}

export default SettingsScreen;
