from .models import Booking


# To do 
# filter the Booking by user entered date
# then filter it using slot user demanded
# if free book the slot and return true else False


def check_booked_slot(date, slot):
    try:
        objs = Booking.objects.get(date=date, slot=slot)
        return True
    except:
        return False