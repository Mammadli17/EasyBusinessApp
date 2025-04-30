import React, { useRef, useEffect } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';

const { height } = Dimensions.get('window');

export interface FilterOptions {
  dateRange?: {
    start?: Date;
    end?: Date;
  };
  selectedCompanies?: string[];
}

interface ConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText: string;
  cancelText: string;
  type?: 'danger' | 'warning' | 'default';
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  visible,
  onClose,
  onConfirm,
  title,
  description,
  confirmText,
  cancelText,
  type = 'default'
}) => {
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
          duration: 250,
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
    onConfirm();
    onClose();
  };

  const getButtonStyles = () => {
    switch (type) {
      case 'danger':
        return {
          button: [styles.button, styles.dangerButton],
          text: styles.dangerButtonText
        };
      case 'warning':
        return {
          button: [styles.button, styles.warningButton],
          text: styles.warningButtonText
        };
      default:
        return {
          button: [styles.button, styles.defaultButton],
          text: styles.defaultButtonText
        };
    }
  };

  const buttonStyles = getButtonStyles();

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      statusBarTranslucent
      animationType="none"
      onRequestClose={onClose}
    >
      <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" barStyle="light-content" />
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
        <TouchableOpacity 
          style={styles.dismissArea} 
          onPress={onClose}
          activeOpacity={1}
        />
        <Animated.View
          style={[
            styles.modalContent,
            {
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <View style={styles.modalContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.modalTitle}>{title}</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
            </View>
            
            <Text style={styles.modalDescription}>
              {description}
            </Text>
            
            <TouchableOpacity 
              style={buttonStyles.button}
              onPress={handleConfirm}
            >
              <Text style={buttonStyles.text}>
                {confirmText}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>
                {cancelText}
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.View>
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
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 10,
  },
  modalContainer: {
    padding: 25,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 26,
    color: '#B3B1B8',
    textAlign: 'center',
    lineHeight: 26,
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: '600',
    fontFamily: "Onest-Medium",
    color: 'hsla(254, 48%, 9%, 1)',
    textAlign: 'center',
    maxWidth: '80%',
  },
  modalDescription: {
    fontSize: 14,
    color: '#0000007A',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: "Onest-Medium",
    lineHeight: 20,
  },
  button: {
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
    borderWidth: 1,
  },
  dangerButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFC7C7',
  },
  warningButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFE5B2',
  },
  defaultButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#ECECED',
  },
  cancelButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#ECECED',
  },
  dangerButtonText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: "Onest-Medium",
    color: '#F03D3D'
  },
  warningButtonText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: "Onest-Medium",
    color: '#D97706'
  },
  defaultButtonText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: "Onest-Medium",
    color: '#4F4B5C'
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: "Onest-Medium",
    color: '#4F4B5C'
  },
});