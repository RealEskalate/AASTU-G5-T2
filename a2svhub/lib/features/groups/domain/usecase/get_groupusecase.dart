

import 'package:a2svhub/core/error/failures.dart';
import 'package:a2svhub/features/groups/domain/entities/group_entity.dart';
import 'package:a2svhub/features/groups/domain/repository/group_repository.dart';
import 'package:dartz/dartz.dart';

class GetGroupUseCase {
  final GroupRepository groupRepository;
  GetGroupUseCase( this.groupRepository);

  Future<Either<Failure, GroupEntity>> execute(String id) {
    return groupRepository.getgroup(id);
  }
}
