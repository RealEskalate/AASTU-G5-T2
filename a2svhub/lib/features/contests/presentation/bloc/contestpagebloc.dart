import 'package:a2svhub/features/contests/domain/usecase/getcontestsusecase.dart';
import 'package:a2svhub/features/contests/presentation/bloc/contestpageevent.dart';
import 'package:a2svhub/features/contests/presentation/bloc/contestpagestate.dart';
import 'package:flutter_bloc/flutter_bloc.dart';



class ContestBloc extends Bloc<ContestEvent, ContestState> {
  final GetContestsUseCase getContestsUseCase;

  ContestBloc(this.getContestsUseCase) : super(ContestInitial()) {
    on<LoadContestsEvent>((event, emit) async {
      emit(ContestLoading());
      final result = await getContestsUseCase.execute();
      result.fold(
        (failure) => emit(ContestError(failure.message ?? "Unknown error")),
        (contests) => emit(ContestLoaded(contests)),
      );
    });
  }
}
