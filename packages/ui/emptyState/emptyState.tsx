import {
  EmptyStateActions,
  EmptyStateBody,
  EmptyStateContainer,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
  type EmptyStateProps,
} from '@saas-ui/react'

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  colorScheme,
  title,
  description,
  actions,
  height = '100%',
  textAlign = 'center',
}) => {
  return (
    <EmptyStateContainer colorScheme={colorScheme} height={height} textAlign={textAlign}>
      <EmptyStateBody>
        <EmptyStateIcon as={icon} />

        <EmptyStateTitle>{title}</EmptyStateTitle>
        <EmptyStateDescription>{description}</EmptyStateDescription>
        <EmptyStateActions>{actions}</EmptyStateActions>
      </EmptyStateBody>
    </EmptyStateContainer>
  )
}
