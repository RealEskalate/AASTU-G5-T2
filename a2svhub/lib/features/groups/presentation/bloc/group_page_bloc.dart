import 'dart:async';

import 'package:a2svhub/core/error/failures.dart';
import 'package:a2svhub/features/groups/domain/entities/group_entity.dart';
import 'package:a2svhub/features/groups/domain/usecase/get_groupsusecase.dart';
import 'package:a2svhub/features/groups/presentation/bloc/group_page_event.dart';
import 'package:a2svhub/features/groups/presentation/bloc/group_page_state.dart';
import 'package:bloc/bloc.dart';
import 'package:dartz/dartz.dart';


class GroupPageBloc extends Bloc<GroupPageEvent , GrouppageState> {
  final GetGroupsUseCase getgroupsUseCase;
  GroupPageBloc({required this.getgroupsUseCase}) : super(GrouppageInitial()) {
    on<GroupPageLoadEvent>(_onGroupPageLoad);
    on<RefreshPageLoadEvent>(_onRefreshPageLoad);
  }

  Future<void> _onGroupPageLoad(
    GroupPageLoadEvent  event,
    Emitter<GrouppageState> emit,
  ) async {
    emit(GroupPageLoading());
    try {
      final Either<Failure, List<GroupEntity>> result =
          await getgroupsUseCase.execute();
      emit(result.fold(
        (failure) => GroupPageError(Message: _mapFailureToMessage(failure)),
        (products) => GroupPageLoaded(groups: products),
      ));
    } catch (_) {
      emit(GroupPageError(Message: 'Failed to load products'));
    }
  }

  Future<void> _onRefreshPageLoad(
    RefreshPageLoadEvent event,
    Emitter<GrouppageState> emit,
  ) async {
    emit(GroupPageLoading());
    try {
      final Either<Failure, List<GroupEntity>> result =
          await getgroupsUseCase.execute();
      emit(result.fold(
        (failure) => GroupPageError(Message: _mapFailureToMessage(failure)),
        (groups) => GroupPageLoaded(groups: groups),
      ));
    } catch (_) {
      emit(GroupPageError(Message: 'Failed to refresh products'));
    }
  }

  String _mapFailureToMessage(Failure failure) {
    // Return more specific messages based on the Failure type
    return "Failed to load products";
  }
}
