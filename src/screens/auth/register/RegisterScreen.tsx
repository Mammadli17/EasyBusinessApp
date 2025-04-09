import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Animated,
    Easing,
    StatusBar,
} from 'react-native';
import { normalize } from '../../../theme/metrics';
import { SvgImage } from '../../../components/svgImage/SvgImage';

interface ForumData {
    fullname: string;
    fin: string;
    password: string;
    cpassword: string;
    number: string;
    email: string;
    location: string;
    workplace: string;
    tin: string;
}
const RegisterScreen = () => {
    const [step, setStep] = useState(1);
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const translateAnim = useRef(new Animated.Value(0)).current;

    const [forumData, setForumData] = useState<ForumData>({
        fullname: '',
        fin: "",
        password: "",
        cpassword: "",
        number: "",
        email: "",
        location: "",
        workplace: "",
        tin: "",
    });
    const animateStepChange = (nextStep: number) => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 300,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.timing(translateAnim, {
                toValue: nextStep > step ? 20 : -20,
                duration: 300,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
        ]).start(() => {
            setStep(nextStep);
            translateAnim.setValue(nextStep > step ? -20 : 20);

            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
                    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                    useNativeDriver: true,
                }),
                Animated.timing(translateAnim, {
                    toValue: 0,
                    duration: 300,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: true,
                }),
            ]).start();
        });
    };

    const handleNext = () => {
        if (step === 1) animateStepChange(2);
    };

    const handleBack = () => {
        if (step === 2) animateStepChange(1);
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
            <StatusBar backgroundColor={"#F3F3F3"} />
            <View style={styles.header}>
                <TouchableOpacity style={{ paddingRight: normalize("width", 0) }} onPress={handleBack}>
                    <SvgImage
                        source={require("../../../assets/svg/back/back.svg")}
                        height={14}
                        width={14}
                    />
                </TouchableOpacity>
                <Text style={[styles.title]}>Register.</Text>
            </View>
            <View style={{ marginTop: normalize("height", 30) }}>
                <View style={styles.stepsContainer}>
                    <View style={step === 1 ? styles.stepCircleActive : styles.stepCircleInactive}>
                        <Text style={step === 1 ? styles.stepNumber : styles.stepNumberInactive}>1</Text>
                    </View>
                    <View style={styles.line} />
                    <View style={step === 2 ? styles.stepCircleActive : styles.stepCircleInactive}>
                        <Text style={step === 2 ? styles.stepNumber : styles.stepNumberInactive}>2</Text>
                    </View>
                </View>

                <View style={styles.stepsLabelContainer}>
                    <Text style={step === 1 ? styles.stepLabelActive : styles.stepLabelInactive}>
                        Account setup
                    </Text>
                    <Text style={step === 2 ? styles.stepLabelActive : styles.stepLabelInactive}>
                        Store details
                    </Text>
                </View>
            </View>

            <Animated.View
                style={[
                    styles.inputContainer,
                    {
                        opacity: fadeAnim,
                        transform: [{ translateY: translateAnim }],
                    },
                ]}
            >
                {step === 1 ? (
                    <>
                        <View style={styles.inputWrapper}>
                            <TextInput placeholder="Full name" style={styles.input} placeholderTextColor="#8E8E93" />
                        </View>
                        <View style={styles.inputWrapper}>
                            <TextInput placeholder="FIN code" style={styles.input} placeholderTextColor="#8E8E93" />
                        </View>
                        <View style={styles.inputWrapper}>
                            <TextInput placeholder="Password" style={styles.input} secureTextEntry placeholderTextColor="#8E8E93" />
                        </View>
                        <View style={styles.inputWrapper}>
                            <TextInput placeholder="Reenter password" style={styles.input} secureTextEntry placeholderTextColor="#8E8E93" />
                        </View>
                    </>
                ) : (
                    <>
                        <View style={styles.inputWrapper}>
                            <TextInput placeholder="Store name" style={styles.input} placeholderTextColor="#8E8E93" />
                        </View>
                        <View style={styles.inputWrapper}>
                            <TextInput placeholder="Store address" style={styles.input} placeholderTextColor="#8E8E93" />
                        </View>
                    </>
                )}
            </Animated.View>

            <TouchableOpacity style={styles.continueBtn} onPress={handleNext}>
                <Text style={styles.continueText}>{step === 1 ? 'Continue' : 'Finish'}</Text>
            </TouchableOpacity>

            {step === 1 && (
                <>
                    <TouchableOpacity style={styles.authOption}>
                        <Text style={styles.authText}>Register with Asan İmza</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.authOption}>
                        <Text style={styles.authText}>Register with Sima</Text>
                    </TouchableOpacity>
                    <Text style={styles.footerText}>
                        Already have an account? <Text style={styles.loginText}>Login</Text>
                    </Text>
                </>
            )}
        </ScrollView>
    );
};




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F3F3',
        paddingHorizontal: normalize("width", 20),
        paddingTop: normalize("height", 20),
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%"
    },
    backBtn: {
        alignSelf: 'flex-start',
        marginBottom: 10,
    },

    backText: {
        fontSize: 16,
        color: '#004D40',
        fontWeight: '500',
        fontFamily: 'Ubuntu-Regular',
    },

    title: {
        fontSize: normalize("font", 26),
        // marginBottom: 30,
        textAlign: 'center',
        color: "#110C22",
        fontFamily: "Onest-Medium",
        flex: 1,
        paddingRight: normalize("width", 14)

    },
    stepsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    stepCircleActive: {
        width: normalize("height", 32),
        height: normalize("height", 32),
        borderRadius: normalize("height", 16),
        backgroundColor: '#015656',
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepCircleInactive: {
        width: normalize("height", 32),
        height: normalize("height", 32),
        borderRadius: normalize("height", 16),
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepNumber: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: normalize("font", 16)
    },
    stepNumberInactive: {
        color: '#110C2252',
        fontWeight: '600',
        fontSize: normalize("font", 16)

    },
    line: {
        width: normalize("width", 135),
        height: normalize("height", 1),
        backgroundColor: '#E0E0E0',
    },
    stepsLabelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: normalize("width", 45),
        marginVertical: normalize("height", 12),
    },
    stepLabelActive: {
        color: '#015656',
        fontWeight: '500',
        fontSize: normalize("font", 12),
        fontFamily: "Onest-Medium",
    },
    stepLabelInactive: {
        color: '#110C2252',
        fontWeight: '500',
        fontSize: normalize("font", 12),
        fontFamily: "Onest-Medium",

    },
    inputContainer: {
        marginTop: 20,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        height: 48,
        fontSize: 16,
        fontFamily: 'Ubuntu-Regular',
        color: '#000',
    },
    continueBtn: {
        backgroundColor: '#004D40',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    continueText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    authOption: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 10,
        marginBottom: 10,
    },
    authText: {
        fontSize: 16,
        fontFamily: 'Ubuntu-Regular',
    },
    footerText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 14,
        color: '#8E8E93',
    },
    loginText: {
        color: '#004D40',
        fontWeight: '500',
    },
});

export default RegisterScreen;
