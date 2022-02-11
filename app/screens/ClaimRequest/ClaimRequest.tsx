import styles from './styles';
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Screens } from '../../App';

type Props = {
    setScreen: (screen: Screens) => void
    claimData: {
        claims: number[],
        callbackURL: string
    }
}

const ClaimRequest = ({ setScreen, claimData }: Props) => {
    function handlePress(accepted: boolean) {
        setScreen("Info")
        console.log(accepted);
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Claim Request</Text>
            <Text style={styles.claim}>{claimData.callbackURL} is requesting Claims: {claimData.claims.join(", ")}</Text>
            <Pressable style={styles.button} onPress={() => handlePress(true)} >
                <Text style={styles.buttonText}>Yes</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => handlePress(false)} >
                <Text style={styles.buttonText}>No</Text>
            </Pressable>
        </View>
    )
}

export default ClaimRequest;