
import 'package:a2svhub/core/error/failures.dart';
import 'package:a2svhub/features/groups/domain/entities/group_entity.dart';
import 'package:a2svhub/features/groups/domain/repository/group_repository.dart';
import 'package:dartz/dartz.dart';

class GetGroupsUseCase {
  final GroupRepository groupRepository;
  GetGroupsUseCase(this.groupRepository);

  Future<Either<Failure, List<GroupEntity>>> execute() {
    return groupRepository.getgroups();
  }
}
