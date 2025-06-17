from rest_framework import permissions

class IsShopOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow shop owners to edit their own shops.
    """
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the owner of the shop
        return obj.owner == request.user 