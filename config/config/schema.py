import graphene
from graphene_django import DjangoObjectType
from users.models import Users
from TODO.models import Project


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class UserType(DjangoObjectType):
    class Meta:
        model = Users
        fields = '__all__'


class Query(graphene.ObjectType):
    all_projects = graphene.List(ProjectType)
    user_by_id = graphene.Field(UserType, id=graphene.Int(required=True))

    def resolve_user_by_id(root, info):
        try:
            return Users.objects.get(id=id)
        except Users.DoesNotExist:
            return None

    def resolve_all_projects(root, info):
        return Project.objects.all()


schema = graphene.Schema(query=Query)
