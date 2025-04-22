import React, { useRef, useEffect } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useTranslation } from 'react-i18next';

const { height } = Dimensions.get('window');

interface DeclineReasonModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  reason: string;
  onReasonChange: (reason: string) => void;
}

export const DeclineReasonModal: React.FC<DeclineReasonModalProps> = ({
  visible,
  onClose,
  onConfirm,
  reason,
  onReasonChange,
}) => {
  const { t } = useTranslation();
  const slideAnim = useRef(new Animated.Value(height)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          damping: 20,
          mass: 1.2,
          stiffness: 100,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        })
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: height,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [visible]);

  const handleConfirm = () => {
    Keyboard.dismiss();
    onConfirm(reason);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
          <TouchableOpacity
            style={styles.dismissArea}
            onPress={onClose}
            activeOpacity={1}
          />
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={0}
          >
            <Animated.View
              style={[
                styles.modalContent,
                {
                  transform: [{ translateY: slideAnim }],
                  maxHeight: height * 0.6
                }
              ]}
            >
              <View style={styles.modalContainer}>
                <View style={styles.headerContainer}>
                  <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>✕</Text>
                  </TouchableOpacity>

                  <Text style={styles.modalTitle}>{t('Decline Reason')}</Text>
                </View>

                <Text style={styles.modalDescription}>
                  {t('Please provide the reason for declining the confrontation. By clicking decline, you will reject the confrontation.')}
                </Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.reasonInput}
                    placeholder={t('Decline reason')}
                    placeholderTextColor="#B3B1B8"
                    value={reason}
                    onChangeText={onReasonChange}
                    multiline
                    numberOfLines={4}
                    returnKeyType="done"
                    onSubmitEditing={Keyboard.dismiss}
                  />

                  <TouchableOpacity
                    style={[styles.button, styles.confirmButton, !reason.trim() && styles.disabledButton]}
                    onPress={handleConfirm}
                    disabled={!reason.trim()}
                  >
                    <Text style={[styles.confirmButtonText, !reason.trim() && styles.disabledButtonText]}>
                      {t('Submit Decline')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Animated.View>
          </KeyboardAvoidingView>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  dismissArea: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: '#F3F3F3',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalContainer: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    backgroundColor: '#F3F3F3',
    borderRadius: 12,
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    padding: 8,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#B3B1B8',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },  
  modalTitle: {
    fontSize: 26,
    fontWeight: '700',
    fontFamily: "Onest-Medium",
    color: 'hsla(254, 48%, 9%, 1)',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.48)',
    textAlign: 'center',
    marginBottom: 25,
    fontFamily: "Onest-Light",
    lineHeight: 20,
    margin: 20
  },
  reasonInput: {
    height: 120,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    fontFamily: "Onest-Medium",
    fontSize: 14,
    color: 'hsla(254, 48%, 9%, 0.74)',
    backgroundColor: '#FFFFFF',
  },
  button: {
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FFC7C7',
  },
  disabledButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#F3F3F3',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: "Onest-Medium",
    color: '#F03D3D'
  },
  disabledButtonText: {
    color: '#B3B1B8',
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    gap: 10,
  }
});