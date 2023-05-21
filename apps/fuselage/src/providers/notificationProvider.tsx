import React from 'react'
import kebabCase from 'lodash/kebabCase'
import { NotificationProvider } from '@refinedev/core'
import { UndoableNotification } from '@refinedev/chakra-ui'
import { useToast } from '@chakra-ui/react'

export const notificationProvider = (translate): NotificationProvider => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const toast = useToast({
    position: 'top-right',
    isClosable: true,
  })

  return {
    open: ({ key, message, type, description, undoableTimeout, cancelMutation }) => {
      const descriptionTranslated = translate(`backend.${key}.${kebabCase(description)}`)

      if (type === 'progress') {
        if (key && toast.isActive(key)) {
          toast.update(key, {
            render: () => (
              <UndoableNotification
                notificationKey={key}
                message={translate(message, message)}
                cancelMutation={cancelMutation}
                undoableTimeout={undoableTimeout}
              />
            ),
          })
        } else {
          toast({
            id: key,
            render: () => (
              <UndoableNotification
                notificationKey={key}
                message={message}
                cancelMutation={cancelMutation}
                undoableTimeout={undoableTimeout}
              />
            ),
          })
        }
      } else {
        if (key && toast.isActive(key)) {
          toast.update(key, {
            title: message,
            status: type,
            description: descriptionTranslated,
          })
        } else {
          toast({
            id: key,
            title: message,
            description: descriptionTranslated,
            status: type,
          })
        }
      }
    },
    close: (key) => toast.close(key),
  }
}
