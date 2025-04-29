import React, { useRef, useEffect } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  Dimensions,
} from 'react-native';
import { useTranslation } from 'react-i18next';

const { height } = Dimensions.get('window');

interface DeletePhotoModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeletePhotoModal: React.FC<DeletePhotoModalProps> = ({
  visible,
  onClose,
  onConfirm,
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
    onConfirm();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
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
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
            
            <Text style={styles.modalTitle}>{t('Şəkli sil')}</Text>
            
            <Text style={styles.modalDescription}>
              {t('Profil şəklinizi silmək istədiyinizə əminsiniz?')}
            </Text>
            
            <TouchableOpacity 
              style={[styles.button, styles.deleteButton]}
              onPress={handleConfirm}
            >
              <Text style={styles.deleteButtonText}>
                {t('Şəkli sil')}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>
                {t('Ləğv et')}
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
  },
  modalContainer: {
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 20,
    padding: 8,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#B3B1B8',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: "Onest-Medium",
    color: 'hsla(254, 48%, 9%, 1)',
    textAlign: 'center',
    marginBottom: 8,
    marginTop: 8,
  },
  modalDescription: {
    fontSize: 14,
    color: 'hsla(254, 48%, 9%, 0.74)',
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
  },
  deleteButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FFC7C7',
  },
  cancelButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#ECECED',
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: "Onest-Medium",
    color: '#F03D3D'
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: "Onest-Medium",
    color: '#4F4B5C'
  },
});